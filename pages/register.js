import React from "react";
import styles from "../styles/Register.module.scss";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import MainHeader from "../components/mainHeader";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Button,
  CircularProgress,
  Collapse,
} from "@material-ui/core";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import Alert from "@material-ui/lab/Alert";
import { useRouter } from "next/router";

const useStyles = makeStyles({
  root: {
    width: "90%",
    marginBottom: 20,
    "& .MuiInput-underline:before": {
      borderColor: "white",
    },
    "&:hover .MuiInput-underline:before": {
      borderColor: "white",
    },
    "& .MuiFormLabel-root": {
      color: "white",
      opacity: 0.5,
    },
    "& .MuiInputBase-input": {
      color: "white",
    },
  },
});

export default function Register() {
  const router = useRouter();

  const [isValid, setIsValid] = useState({
    email: true,
    pass: true,
    name: true,
  });
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [okAlert, setOkAlert] = useState(false);
  const [existAlert, setExistAlert] = useState(false);

  const classes = useStyles();
  useEffect(() => {
    if (
      (email.length < 9 ||
        email.indexOf("@") == -1 ||
        email.indexOf(".") == -1) &&
      email.length > 0
    ) {
      setIsValid((old) => {
        let obj = { ...old };
        obj.email = false;
        return obj;
      });
    } else {
      setIsValid((old) => {
        let obj = { ...old };
        obj.email = true;
        return obj;
      });
    }
  }, [email]);
  useEffect(() => {
    if (pass.length < 6 && pass.length > 0) {
      setIsValid((old) => {
        let obj = { ...old };
        obj.pass = false;
        return obj;
      });
    } else {
      setIsValid((old) => {
        let obj = { ...old };
        obj.pass = true;
        return obj;
      });
    }
  }, [pass]);
  useEffect(() => {
    if (name.length < 8 && name.length > 0) {
      setIsValid((old) => {
        let obj = { ...old };
        obj.name = false;
        return obj;
      });
    } else {
      setIsValid((old) => {
        let obj = { ...old };
        obj.name = true;
        return obj;
      });
    }
  }, [name]);
  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BASE_API}register`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        name: name,
        email: email,
        password: pass,
      }),
    }).then((res) => {
      if (res.status == 409) {
        setExistAlert(true);
        setLoading(false);
      } else if (res.status == 200) {
        setOkAlert(true);
        setLoading(false);
      }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 1000 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "linear" }}
      className={styles.container}
    >
      <MainHeader title="TnFeed - register" />
      <Collapse in={existAlert}>
        <Alert
          className={styles.alert}
          severity="warning"
          action={<Button onClick={() => setExistAlert(false)}>ok</Button>}
        >
          Email already registred !
        </Alert>
      </Collapse>
      <Collapse in={okAlert}>
        <Alert
          className={styles.alert}
          severity="success"
          action={<Button onClick={() => router.push("/login")}>login</Button>}
        >
          Registred Successfully !
        </Alert>
      </Collapse>
      <Image src="/logo.svg" height={100} width={250} />
      <form onSubmit={submitHandler}>
        {loading ? (
          <div className={styles.loadingScreen}>
            <CircularProgress color="inherit" />
          </div>
        ) : (
          <React.Fragment>
            {" "}
            <Link href="/">
              <Button className={styles.backBtn}>
                <ArrowBackIosRoundedIcon />
                Back to home
              </Button>
            </Link>
            <TextField
              required
              error={isValid.name ? false : true}
              className={classes.root}
              label="Full Name"
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              required
              error={isValid.email ? false : true}
              className={classes.root}
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              required
              error={isValid.pass ? false : true}
              className={classes.root}
              label="Password"
              type="password"
              onChange={(e) => setPass(e.target.value)}
            />
            <Button
              disabled={
                isValid.email && isValid.name && isValid.pass ? false : true
              }
              className={styles.submitBtn}
              type="submit"
            >
              Join Now
            </Button>
          </React.Fragment>
        )}
      </form>
    </motion.div>
  );
}
