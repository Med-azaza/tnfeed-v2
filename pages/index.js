import { useEffect } from "react";
import MainHeader from "../components/mainHeader";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import Button from "@material-ui/core/Button";
import { AccountCircle, PersonAdd } from "@material-ui/icons";
import Link from "next/link";

export default function Home() {
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_API}test`)
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className={styles.container}>
      <MainHeader title="Tn Feed - first tunisian social media platform" />
      <header>
        <span>welcome to</span>
        <Image src="/logo.svg" width={350} height={150} />
      </header>
      <div className={styles.btns}>
        <Link href="/login">
          <Button startIcon={<AccountCircle style={{ fontSize: 30 }} />}>
            Login
          </Button>
        </Link>
        <Link href="/register">
          <Button startIcon={<PersonAdd style={{ fontSize: 30 }} />}>
            sign Up
          </Button>
        </Link>
      </div>
    </div>
  );
}
