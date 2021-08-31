import styles from "../styles/Register.module.scss";
import Link from "next/link";
import { motion } from "framer-motion";
import MainHeader from "../components/mainHeader";

export default function Register() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 1000 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "linear" }}
      className={styles.container}
    >
      <MainHeader title="TnFeed - register" />
      register page
      <Link href="/">go back</Link>
    </motion.div>
  );
}
