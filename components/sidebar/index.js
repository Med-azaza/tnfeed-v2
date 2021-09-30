import styles from "./Sidebar.module.scss";
import { useState, useEffect } from "react";
import { Button, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { LinearProgress } from "@mui/material";

const useStyles = makeStyles(() => ({
  purple: {
    backgroundColor: "#a975ff",
  },
}));

export default function Sidebar({ userData, token, currentUserInfos }) {
  const [requests, setRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [reqLoading, setReqLoading] = useState(true);
  const [friendsLoading, setFriendsLoading] = useState(true);

  const classes = useStyles();

  const fetchFriends = () => {
    setFriendsLoading(true);
    setFriends([]);
    if (userData.friends.length < 1) {
      setFriendsLoading(false);
    } else {
      for (let id of userData.friends) {
        fetch(`${process.env.NEXT_PUBLIC_BASE_API}user/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setFriends((prev) => [...prev, data]);
            userData.friends.indexOf(id) === userData.friends.length - 1 &&
              setFriendsLoading(false);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }
  };

  const fetchRequests = () => {
    setReqLoading(true);
    setRequests([]);
    if (userData.requests.length < 1) {
      setReqLoading(false);
    } else {
      for (let id of userData.requests) {
        fetch(`${process.env.NEXT_PUBLIC_BASE_API}user/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setRequests((prev) => [...prev, data]);
            userData.requests.indexOf(id) === userData.requests.length - 1 &&
              setReqLoading(false);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }
  };
  const accept = (id) => {
    setDisabled(true);
    fetch(`${process.env.NEXT_PUBLIC_BASE_API}user/accept/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status == 200) {
          currentUserInfos();
          setDisabled(false);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchRequests();
    fetchFriends();
  }, [userData]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p>REQUESTS</p>
        <span>{requests.length}</span>
      </div>
      {reqLoading ? (
        <LinearProgress
          sx={{ width: "100%", color: "#a975ff", marginBottom: "5px" }}
          color="inherit"
        />
      ) : (
        requests.map((req) => (
          <div key={req._id} className={styles.request}>
            <div>
              {req.profilePicture ? (
                <Avatar variant="rounded" src={`${req.profilePicture}`} />
              ) : (
                <Avatar variant="rounded" className={classes.purple}>
                  {req.name.charAt(0).toUpperCase()}
                </Avatar>
              )}
              <p>
                <span>{req.name}</span> wants to add you to friends
              </p>
            </div>
            <div>
              <Button disabled={disabled} onClick={() => accept(req._id)}>
                accept
              </Button>
              <Button disabled={disabled}>decline</Button>
            </div>
          </div>
        ))
      )}
      <div className={styles.title}>
        <p>CONTACTS</p>
        <span className={styles.contactsBadge}>{friends.length}</span>
      </div>
      {friendsLoading ? (
        <LinearProgress
          sx={{ width: "100%", color: "#a975ff" }}
          color="inherit"
        />
      ) : (
        friends.length > 0 && (
          <div className={styles.friendsContainer}>
            {friends.map((fr) => (
              <div key={fr._id} className={styles.friend}>
                {fr.profilePicture ? (
                  <Avatar variant="rounded" src={`${fr.profilePicture}`} />
                ) : (
                  <Avatar variant="rounded" className={classes.purple}>
                    {fr.name.charAt(0).toUpperCase()}
                  </Avatar>
                )}
                <p>{fr.name}</p>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}
