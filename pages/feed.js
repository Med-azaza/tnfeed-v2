import { useState, useEffect } from "react";
import styles from "../styles/Feed.module.scss";
import { useCookies } from "react-cookie";
import { CircularProgress, Avatar, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  SearchRounded,
  HomeOutlined,
  PersonOutlineOutlined,
  SettingsOutlined,
} from "@material-ui/icons";
import MainHeader from "../components/mainHeader";

const useStyles = makeStyles(() => ({
  purple: {
    backgroundColor: "#a975ff",
  },
}));

export default function Feed() {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [loading, setLoading] = useState(true);
  const token = cookies.token;
  const [userData, setUserData] = useState({});
  const [nav, setNav] = useState("home");

  const router = useRouter();
  const classes = useStyles();

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
      <MainHeader title="TnFeed - Home" />
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
            <Avatar className={classes.purple}>
              {userData.name.charAt(0).toUpperCase()}
            </Avatar>
            <p>
              <span>{userData.name}</span> <br />
              <span>{userData.username}</span>
            </p>
          </section>
          <section className={styles.navigation}>
            <ul>
              <li
                className={nav === "home" && styles.selected}
                onClick={() => setNav("home")}
              >
                <HomeOutlined /> Home
              </li>
              <li
                className={nav === "profile" && styles.selected}
                onClick={() => setNav("profile")}
              >
                <PersonOutlineOutlined /> Profile
              </li>
              <li
                className={nav === "settings" && styles.selected}
                onClick={() => setNav("settings")}
              >
                <SettingsOutlined /> Settings
              </li>
            </ul>
          </section>
        </div>
        <div>
          {nav === "home" ? (
            <span>homepage</span>
          ) : nav === "profile" ? (
            <span>profile</span>
          ) : (
            <span>
              settings <br />{" "}
              <Button
                onClick={() => {
                  setLoading(true);
                  removeCookie("token");
                  router.push("/");
                }}
              >
                Log out
              </Button>
            </span>
          )}
        </div>
        <div></div>
      </div>
    </div>
  );
}
