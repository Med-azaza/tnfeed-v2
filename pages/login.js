import styles from "../styles/Login.module.scss";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { TextField, Button } from "@material-ui/core";
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
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
  const submitHandler = (e) => {
    e.preventDefault();
    alert(`${email}, ${pass}`);
  };
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
        <Link href='/'>
          <Button className={styles.backBtn}><ArrowBackIosRoundedIcon/>Back to home</Button>
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
        <Button className={styles.submitBtn} type="submit">Login</Button>
      </form>
    </motion.div>
  );
}
