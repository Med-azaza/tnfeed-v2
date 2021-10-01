import styles from "./Sidebar.module.scss";
import { useState, useEffect } from "react";
import { Button, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { LinearProgress, IconButton, Menu, MenuItem } from "@mui/material";
import { MoreHoriz } from "@material-ui/icons";
import { fetchFriends, fetchRequests, accept, decline } from "./friendSystem";

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
  const [options, setOptions] = useState(null);

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    fetchRequests(setReqLoading, setRequests, userData, token);
    fetchFriends(setFriendsLoading, setFriends, userData, token);
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
              <Button
                disabled={disabled}
                onClick={() =>
                  accept(req._id, setDisabled, token, currentUserInfos)
                }
              >
                accept
              </Button>
              <Button
                disabled={disabled}
                onClick={() =>
                  decline(req._id, setDisabled, token, currentUserInfos)
                }
              >
                decline
              </Button>
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
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls="long-menu"
                  aria-expanded={open ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={(e) => {
                    setOptions(fr._id);
                    handleClick(e);
                  }}
                >
                  <MoreHoriz />
                </IconButton>
                <Menu
                  id="long-menu"
                  MenuListProps={{
                    "aria-labelledby": "long-button",
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem
                    onClick={() => {
                      alert(options);
                      handleClose();
                    }}
                  >
                    remove
                  </MenuItem>
                </Menu>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}
