import { useState, useEffect } from "react";
import styles from "./Share.module.scss";
import { Avatar, Button } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  purple: {
    backgroundColor: "#a975ff",
  },
}));

export default function Share({
  userData,
  fetchPosts,
  postLoading,
  setPostLoading,
  token,
}) {
  const [postText, setPostText] = useState("");
  const classes = useStyles();

  const postHandle = () => {
    setPostLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BASE_API}posts/new`, {
      method: "POST",
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
  return (
    <div className={styles.container}>
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
  );
}
