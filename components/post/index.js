import styles from "./Post.module.scss";
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
import Image from "next/image";
import image from "next/image";

const useStyles = makeStyles(() => ({
  purple: {
    backgroundColor: "#a975ff",
  },
}));

export default function Post({
  content,
  date,
  likes,
  comments,
  userData,
  id,
  token,
  ownerId,
  media,
}) {
  const [anchor, setAnchor] = useState(null);
  const [dateStr, setDateStr] = useState("");
  const [liked, setLiked] = useState(false);
  const [likeProc, setLikeProc] = useState(false);
  const [likeCounter, setLikeCounter] = useState(likes.length);
  const [owner, setOwner] = useState(null);

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
    fetch(`${process.env.NEXT_PUBLIC_BASE_API}posts/like/${id}`, {
      method: "PUT",
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
    fetch(`${process.env.NEXT_PUBLIC_BASE_API}user/${ownerId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setOwner(data);
      })
      .catch((err) => {
        console.error(err);
      });
    setDateStr(dateFormat(date));
    if (likes.indexOf(userData._id) > -1) {
      setLiked(true);
    }
  }, []);

  return (
    <div className={styles.container}>
      <header>
        <div>
          <div>
            {owner && owner.profilePicture ? (
              <Avatar
                variant="rounded"
                src={`${process.env.NEXT_PUBLIC_BASE_API}images/${owner.profilePicture}`}
              />
            ) : (
              <Avatar variant="rounded" className={classes.purple}>
                {owner && owner.name.charAt(0).toUpperCase()}
              </Avatar>
            )}
          </div>
          <div>
            <p>{owner && owner.name}</p>
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
      <main>
        {content}
        {media && (
          <img src={`${process.env.NEXT_PUBLIC_BASE_API}images/${media}`} />
        )}
      </main>
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
