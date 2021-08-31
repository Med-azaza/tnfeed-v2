import styles from "../styles/Login.module.scss";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { motion } from "framer-motion";
import MainHeader from "../components/mainHeader";

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

export default function Login() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isValid, setIsValid] = useState({ email: true, pass: true });
  const submitHandler = (e) => {
    e.preventDefault();
    alert(`${email}, ${pass}`);
  };
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
  return (
    <motion.div
      initial={{ opacity: 0, x: 1000 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "linear" }}
      className={styles.container}
    >
      <MainHeader title="TnFeed - login" />
      <Image src="/logo.svg" height={100} width={250} />
      <form onSubmit={submitHandler}>
        <TextField
          required
          error={isValid.email ? false : true}
          className={classes.root}
          label="Email"
          helperText={`${!isValid.email ? "invalid email" : ""}`}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          required
          error={isValid.pass ? false : true}
          className={classes.root}
          label="Password"
          type="password"
          helperText={`${!isValid.pass ? "invalid password" : ""}`}
          onChange={(e) => setPass(e.target.value.toString())}
        />
        <Button type="submit">Login</Button>
      </form>
    </motion.div>
  );
}
