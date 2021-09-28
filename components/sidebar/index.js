import styles from "./Sidebar.module.scss";
import { useState, useEffect } from "react";
import { Button, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  purple: {
    backgroundColor: "#a975ff",
  },
}));

export default function Sidebar({ userData, token }) {
  const [requests, setRequests] = useState([]);

  const classes = useStyles();

  const fetchRequests = () => {
    setRequests([]);
    for (let id of userData.requests) {
      console.log(id);
      fetch(`${process.env.NEXT_PUBLIC_BASE_API}user/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setRequests((prev) => [...prev, data]);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p>REQUESTS</p>
        <span>{requests.length}</span>
      </div>
      {requests.map((req) => (
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
            <Button>accept</Button>
            <Button>decline</Button>
          </div>
        </div>
      ))}
      <div className={styles.title}>
        <p>CONTACTS</p>
        <span className={styles.contactsBadge}>32</span>
      </div>
      <div className={styles.friendsContainer}>
        <div className={styles.friend}>
          <Avatar variant="rounded">A</Avatar>
          <p>user Name</p>
        </div>
        <div className={styles.friend}>
          <Avatar variant="rounded">A</Avatar>
          <p>user Name</p>
        </div>
        <div className={styles.friend}>
          <Avatar variant="rounded">A</Avatar>
          <p>user Name</p>
        </div>
      </div>
    </div>
  );
}
