import styles from "./Navbar.module.scss";
import { Avatar } from "@material-ui/core";
import {
  HomeOutlined,
  PersonOutlineOutlined,
  SettingsOutlined,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  purple: {
    backgroundColor: "#a975ff",
  },
}));

export default function Navbar({ setNav, userData, nav }) {
  const classes = useStyles();
  return (
    <div className={styles.container}>
      <section className={styles.username}>
        {userData.profilePicture === "" ? (
          <Avatar className={classes.purple}>
            {userData.name.charAt(0).toUpperCase()}
          </Avatar>
        ) : (
          <Avatar src={`${userData.profilePicture}`} />
        )}

        <p>
          <span>{userData.name}</span> <br />
          <span>{userData.username}</span>
        </p>
      </section>
      <section className={styles.navigation}>
        <ul>
          <li
            className={nav === "home" ? styles.selected : undefined}
            onClick={() => setNav("home")}
          >
            <HomeOutlined /> Home
          </li>
          <li
            className={nav === "profile" ? styles.selected : undefined}
            onClick={() => setNav("profile")}
          >
            <PersonOutlineOutlined /> Profile
          </li>
          <li
            className={nav === "settings" ? styles.selected : undefined}
            onClick={() => setNav("settings")}
          >
            <SettingsOutlined /> Settings
          </li>
        </ul>
      </section>
    </div>
  );
}
