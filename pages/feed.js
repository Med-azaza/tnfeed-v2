import React, { useState, useEffect } from "react";
import styles from "../styles/Feed.module.scss";
import { useCookies } from "react-cookie";
import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@mui/material/Skeleton";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import MainHeader from "../components/mainHeader";
import Post from "../components/post";
import Profile from "../components/profile";
import Topbar from "../components/topbar";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import Share from "../components/share";
import Settings from "../components/settings";
import { CloseRounded } from "@material-ui/icons";

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
  const [showProfile, setShowProfile] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

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
  const currentUserInfos = () => {
    setLoading(true);
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
  };

  useEffect(() => {
    currentUserInfos();
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
                      setShowProfile={setShowProfile}
                      setSelectedId={setSelectedId}
                    />
                  ))
                )}
              </div>
              <AnimatePresence>
                {showProfile && (
                  <motion.div
                    initial={{ y: 500 }}
                    animate={{ y: 0 }}
                    exit={{ y: 500 }}
                    transition={{ type: "linear" }}
                    className={styles.profileContainer}
                  >
                    <Profile
                      userData={userData}
                      current={selectedId === userData._id ? true : false}
                      id={selectedId}
                      token={token}
                      setShowProfile={setShowProfile}
                      setSelectedId={setSelectedId}
                      currentUserInfos={currentUserInfos}
                    />
                    <div
                      onClick={() => setShowProfile(false)}
                      className={styles.closeBtn}
                    >
                      <CloseRounded fontSize="inherit" color="inherit" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </React.Fragment>
          ) : nav === "profile" ? (
            <Profile
              userData={userData}
              current={true}
              token={token}
              setShowProfile={() => {}}
              setSelectedId={() => {}}
              currentUserInfos={currentUserInfos}
            />
          ) : (
            <Settings userData={userData} token={token} />
          )}
        </div>
        <Sidebar />
      </div>
    </div>
  );
}
