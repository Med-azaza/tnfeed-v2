import { useState, useEffect } from "react";
import styles from "../styles/Feed.module.scss";
import { useCookies } from "react-cookie";
import { CircularProgress, Avatar } from "@material-ui/core";
import Image from "next/image";
import { SearchRounded } from "@material-ui/icons";

export default function Feed() {
  const [cookies, setCookie] = useCookies(["token"]);
  const [loading, setLoading] = useState(true);
  const token = cookies.token;
  const [userData, setUserData] = useState({});
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_API}user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setUserData(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return loading ? (
    <div className={styles.loadingScreen}>
      <CircularProgress size={80} color="inherit" />
    </div>
  ) : (
    <div className={styles.container}>
      <nav>
        <Image src="/logo.svg" width={200} height={50} />
        <div className={styles.searchbar}>
          <SearchRounded />
          <input type="text" placeholder="Search" />
        </div>
      </nav>
      <div className={styles.mainGrid}>
        <div className={styles.menu}>
          <section className={styles.username}>
            <Avatar>{userData.name.charAt(0).toUpperCase()}</Avatar>
            <p>{userData.name}</p>
          </section>
        </div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
