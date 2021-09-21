import React from "react";
import styles from "../styles/Login.module.scss";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  CircularProgress,
  Collapse,
} from "@material-ui/core";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import { makeStyles } from "@material-ui/core/styles";
import { motion } from "framer-motion";
import MainHeader from "../components/mainHeader";
import Alert from "@material-ui/lab/Alert";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

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

export default function Login() {
  const router = useRouter();
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [cookies, setCookie] = useCookies(["token"]);

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BASE_API}auth/login`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: pass,
      }),
    })
      .then((res) => {
        if (res.status == 404) {
          setAlert(true);
          setLoading(false);
        } else {
          return res.json();
        }
      })
      .then((data) => {
        if (data !== undefined) {
          setCookie("token", data.token, { path: "/" });
          router.push("/feed");
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
      <MainHeader title="TnFeed - login" />
      <Collapse in={alert}>
        <Alert
          onBlur={() => setAlert(false)}
          className={styles.alert}
          severity="error"
          action={<Button onClick={() => setAlert(false)}>ok</Button>}
        >
          Invalid Email or Password ! Please try again .
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
            <Link href="/">
              <Button className={styles.backBtn}>
                <ArrowBackIosRoundedIcon />
                Back to home
              </Button>
            </Link>
            <TextField
              required
              className={classes.root}
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              required
              className={classes.root}
              label="Password"
              type="password"
              onChange={(e) => setPass(e.target.value.toString())}
            />
            <Button className={styles.submitBtn} type="submit">
              Login
            </Button>
          </React.Fragment>
        )}
      </form>
    </motion.div>
  );
}
