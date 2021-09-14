import styles from "../styles/Post.module.scss";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  CircularProgress,
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { MoreHoriz, Favorite, FavoriteBorder } from "@material-ui/icons";

const useStyles = makeStyles(() => ({
  purple: {
    backgroundColor: "#a975ff",
  },
}));

export default function Post({
  name,
  content,
  date,
  likers,
  comments,
  userId,
  id,
  token,
}) {
  const [anchor, setAnchor] = useState(null);
  const [dateStr, setDateStr] = useState("");
  const [liked, setLiked] = useState(false);
  const [likeProc, setLikeProc] = useState(false);
  const [likeCounter, setLikeCounter] = useState(likers.length);

  const classes = useStyles();

  const dateFormat = (str) => {
    let def = (Date.now() - parseInt(str)) / 1000;
    let date = "";
    if (def < 10) {
      date = "now";
    } else if (def < 60) {
      date =
        def === 1
          ? `${parseInt(def)} second ago`
          : `${parseInt(def)} seconds ago`;
    } else if (def < 3600) {
      def = parseInt(def / 60);
      date = def === 1 ? `${def} minute ago` : `${def} minutes ago`;
    } else if (def < 86400) {
      def = parseInt(def / 60 / 60);
      date = def === 1 ? `${def} hour ago` : `${def} hours ago`;
    } else {
      def = parseInt(def / 60 / 60 / 24);
      date = def === 1 ? `${def} day ago` : `${def} days ago`;
    }
    return date;
  };
  const likeHandler = () => {
    setLikeProc(true);
    liked ? setLikeCounter(likeCounter - 1) : setLikeCounter(likeCounter + 1);
    fetch(`${process.env.NEXT_PUBLIC_BASE_API}like/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setLiked(!liked);
          setLikeProc(false);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  useEffect(() => {
    setDateStr(dateFormat(date));
    if (likers.indexOf(userId) > -1) {
      setLiked(true);
    }
  }, []);

  return (
    <div className={styles.container}>
      <header>
        <div>
          <div>
            <Avatar variant="rounded" className={classes.purple}>
              {name.charAt(0).toUpperCase()}
            </Avatar>
          </div>
          <div>
            <p>{name}</p>
            <span>{dateStr}</span>
          </div>
        </div>
        <React.Fragment>
          <IconButton
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={(e) => setAnchor(e.currentTarget)}
          >
            <MoreHoriz />
          </IconButton>
          <Menu
            anchorEl={anchor}
            keepMounted
            id="simple-menu"
            open={Boolean(anchor)}
            onClose={() => setAnchor(null)}
          >
            <MenuItem onClick={() => setAnchor(null)}>Edit</MenuItem>
            <MenuItem onClick={() => setAnchor(null)}>Remove</MenuItem>
          </Menu>
        </React.Fragment>
      </header>
      <main>{content}</main>
      <footer>
        {!liked ? (
          <IconButton onClick={likeHandler} disabled={likeProc ? true : false}>
            <FavoriteBorder
              className={likeProc ? styles.likeBtnDisabled : styles.likeBtn}
              color="inherit"
            />
          </IconButton>
        ) : (
          <IconButton onClick={likeHandler} disabled={likeProc ? true : false}>
            <Favorite
              className={likeProc ? styles.likeBtnDisabled : styles.likeBtn}
              color="inherit"
            />
          </IconButton>
        )}
        {likeCounter}
      </footer>
    </div>
  );
}
