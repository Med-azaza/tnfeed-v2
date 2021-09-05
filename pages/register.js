import styles from "../styles/Register.module.scss";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import MainHeader from "../components/mainHeader";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";

const useStyles = makeStyles({
  root: {
    width: 350,
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
  const [isValid, setIsValid] = useState({
    email: true,
    pass: true,
    name: true,
  });
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");

  const classes = useStyles();
  useEffect(() => {
    if (email.length < 6 && email.length > 0) {
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
    if (name.length < 6 && name.length > 0) {
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
    alert("submitted");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 1000 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "linear" }}
      className={styles.container}
    >
      <MainHeader title="TnFeed - register" />
      <Image src="/logo.svg" height={100} width={250} />
      <form onSubmit={submitHandler}>
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
      </form>
    </motion.div>
  );
}
