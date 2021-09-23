import React, { useState, useEffect } from "react";
import styles from "../styles/Feed.module.scss";
import { useCookies } from "react-cookie";
import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@mui/material/Skeleton";
import { useRouter } from "next/router";
import MainHeader from "../components/mainHeader";
import Post from "../components/post";
import Profile from "../components/profile";
import Topbar from "../components/topbar";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import Share from "../components/share";
import Settings from "../components/settings";

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
  const [posts, setPosts] = useState([]);

  const router = useRouter();
  const classes = useStyles();
  const token = cookies.token;

  const fetchPosts = () => {
    setPostLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BASE_API}posts/all`, {
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

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_API}me`, {
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
  useEffect(() => {
    if (nav === "home") {
      fetchPosts();
    }
  }, [nav]);
  return loading ? (
    <div className={styles.loadingScreen}>
      <CircularProgress size={80} color="inherit" />
    </div>
  ) : (
    <div className={styles.container}>
      <MainHeader title="TnFeed - Home" />
      <Topbar setLoading={setLoading} />
      <div className={styles.mainGrid}>
        <Navbar userData={userData} nav={nav} setNav={setNav} />
        <div className={styles.main}>
          {nav === "home" ? (
            <React.Fragment>
              <Share
                fetchPosts={fetchPosts}
                userData={userData}
                postLoding={postLoading}
                setPostLoading={setPostLoading}
                token={token}
              />
              <div className={styles.posts}>
                {postLoading ? (
                  <div className={styles.skeleton}>
                    <Skeleton variant="circular" width={50} height={50} />
                    <Skeleton
                      variant="rectangular"
                      animation="wave"
                      height={150}
                      width={"80%"}
                    />
                    <Skeleton variant="circular" width={50} height={50} />
                    <Skeleton
                      variant="rectangular"
                      animation="wave"
                      height={150}
                      width={"80%"}
                    />
                  </div>
                ) : (
                  posts.map((post) => (
                    <Post
                      key={post._id}
                      id={post._id}
                      likes={post.likes}
                      content={post.content}
                      date={post.date}
                      comments={post.comments}
                      userData={userData}
                      ownerId={post.ownerId}
                      token={token}
                      media={post.media}
                    />
                  ))
                )}
              </div>
            </React.Fragment>
          ) : nav === "profile" ? (
            <Profile userData={userData} token={token} />
          ) : (
            <Settings userData={userData} token={token} />
          )}
        </div>
        <Sidebar />
      </div>
    </div>
  );
}
