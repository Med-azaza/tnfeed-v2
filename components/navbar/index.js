import styles from "./Navbar.module.scss";
import { Avatar } from "@mui/material";
import {
  HomeOutlined,
  PersonOutlineOutlined,
  SettingsOutlined,
} from "@material-ui/icons";

export default function Navbar({ setNav, userData, nav }) {
  return (
    <div className={styles.container}>
      <section className={styles.username}>
        {userData.avatar === "" ? (
          <Avatar className={classes.purple}>
            {userData.name.charAt(0).toUpperCase()}
          </Avatar>
        ) : (
          <Avatar
            src={`${process.env.NEXT_PUBLIC_BASE_API}media/${userData.avatar}`}
          />
        )}

        <p>
          <span>{userData.name}</span> <br />
          <span>{userData.username}</span>
        </p>
      </section>
      <section className={styles.navigation}>
        <ul>
          <li
            className={nav === "home" && styles.selected}
            onClick={() => setNav("home")}
          >
            <HomeOutlined /> Home
          </li>
          <li
            className={nav === "profile" && styles.selected}
            onClick={() => setNav("profile")}
          >
            <PersonOutlineOutlined /> Profile
          </li>
          <li
            className={nav === "settings" && styles.selected}
            onClick={() => setNav("settings")}
          >
            <SettingsOutlined /> Settings
          </li>
        </ul>
      </section>
    </div>
  );
}
