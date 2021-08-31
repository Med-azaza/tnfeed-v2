import styles from "../styles/Login.module.scss";
import Link from "next/link";
import { motion } from "framer-motion";
import MainHeader from "../components/mainHeader";

export default function Login() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 1000 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "linear" }}
      className={styles.container}
    >
      <MainHeader title="TnFeed - login" />
      login page
      <Link href="/">go back</Link>
      <Link href="/register">go reg</Link>
    </motion.div>
  );
}
