import { useState, useEffect } from "react";
import styles from "./Share.module.scss";
import { Avatar, Button, IconButton, Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ImageRounded } from "@material-ui/icons";
import { styled } from "@mui/material/styles";

const Input = styled("input")({
  display: "none",
});

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
  const [file, setFile] = useState(null);
  const classes = useStyles();

  const postHandle = () => {
    setPostLoading(true);
    let postBody = { content: postText };
    if (file) {
      const data = new FormData();
      data.append("file", file);
      setFile(null);
      fetch(`${process.env.NEXT_PUBLIC_BASE_API}upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          postBody.media = data.filename;
          fetch(`${process.env.NEXT_PUBLIC_BASE_API}posts/new`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(postBody),
          })
            .then((response) => {
              setPostText("");
              fetchPosts();
            })
            .catch((err) => {
              console.error(err);
            });
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      fetch(`${process.env.NEXT_PUBLIC_BASE_API}posts/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postBody),
      })
        .then((response) => {
          setPostText("");
          fetchPosts();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };
  return (
    <div className={styles.container}>
      <div>
        <Avatar variant="rounded" className={classes.purple}>
          {userData.name.charAt(0).toUpperCase()}
        </Avatar>
        <textarea
          placeholder={`What's new, ${userData.name.split(" ")[0]}?`}
          onChange={(e) => setPostText(e.target.value)}
          value={postText}
        />
        <label htmlFor="icon-button-file">
          <Input
            accept="image/*"
            id="icon-button-file"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Tooltip title="Add Image">
            <IconButton
              color="inherit"
              aria-label="upload picture"
              component="span"
              className={styles.imgBtn}
            >
              <ImageRounded />
            </IconButton>
          </Tooltip>
        </label>
        <Button
          disabled={!postText || postLoading ? true : false}
          color="inherit"
          onClick={postHandle}
          className={styles.submitButton}
        >
          Post it!
        </Button>
      </div>
      {file && (
        <>
          <div className={styles.imgPre}>
            <img src={URL.createObjectURL(file)} />
          </div>
          <Button onClick={() => setFile(null)}>cancel</Button>
        </>
      )}
    </div>
  );
}
