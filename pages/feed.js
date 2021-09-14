import React, { useState, useEffect } from "react";
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
import Post from "../components/post";

const useStyles = makeStyles(() => ({
  purple: {
    backgroundColor: "#a975ff",
  },
}));

export default function Feed() {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [loading, setLoading] = useState(true);
  const [postLoading, setPostLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [nav, setNav] = useState("home");
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState([]);

  const router = useRouter();
  const classes = useStyles();
  const token = cookies.token;

  const fetchPosts = () => {
    setPostLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BASE_API}post`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setPostLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const postHandle = () => {
    setPostLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BASE_API}post`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content: postText }),
    })
      .then((response) => {
        setPostText("");
        fetchPosts();
      })
      .catch((err) => {
        console.error(err);
      });
  };

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
    fetchPosts();
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
                onClick={() => {
                  setNav("home");
                  fetchPosts();
                }}
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
        <div className={styles.main}>
          {nav === "home" ? (
            <React.Fragment>
              <div className={styles.createPost}>
                <Avatar variant="rounded" className={classes.purple}>
                  {userData.name.charAt(0).toUpperCase()}
                </Avatar>
                <textarea
                  placeholder={`What's new, ${userData.name.split(" ")[0]}?`}
                  onChange={(e) => setPostText(e.target.value)}
                  value={postText}
                />
                <Button
                  disabled={!postText || postLoading ? true : false}
                  color="inherit"
                  onClick={postHandle}
                >
                  Post it!
                </Button>
              </div>
              <div className={styles.posts}>
                {postLoading ? (
                  <CircularProgress size={65} color="inherit" />
                ) : (
                  posts.map((post) => (
                    <Post
                      key={post._id}
                      id={post._id}
                      likers={post.likers}
                      content={post.content}
                      name={post.ownerName}
                      date={post.date}
                      userId={userData._id}
                      token={token}
                    />
                  ))
                )}
              </div>
            </React.Fragment>
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
