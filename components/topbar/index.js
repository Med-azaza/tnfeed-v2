import React, { useState, useEffect } from "react";
import styles from "./Topbar.module.scss";
import {
  SearchRounded,
  ExitToApp,
  NotificationsRounded,
} from "@material-ui/icons";
import Image from "next/image";
import { Button, IconButton, Badge, Menu, MenuItem } from "@mui/material";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import notifications from "./notifDummy";

export default function Topbar({ setLoading }) {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Image src="/logo.svg" width={200} height={50} />
      <div>
        <div className={styles.topbarIcons}>
          <IconButton
            id="notifBtn"
            aria-controls="notifMenu"
            aria-expanded={Boolean(anchorEl) ? "true" : undefined}
            aria-haspopup="true"
            onClick={(e) => setAnchorEl(e.currentTarget)}
            color="inherit"
          >
            <Badge color="warning" variant="dot">
              <NotificationsRounded />
            </Badge>
          </IconButton>
        </div>
        <div className={styles.searchbar}>
          <SearchRounded />
          <input type="text" placeholder="Search" />
        </div>
        <Button
          disableElevation
          className={styles.logoutBtn}
          variant="contained"
          onClick={() => {
            setLoading(true);
            removeCookie("token");
            router.push("/");
          }}
          color="inherit"
          endIcon={<ExitToApp />}
        >
          log out
        </Button>
      </div>
      <Menu
        id="notifMenu"
        MenuListProps={{
          "aria-labelledby": "notifBtn",
        }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          style: {
            maxHeight: 50 * 4.5,
            width: "20ch",
          },
        }}
      >
        {notifications.map((not, index) => (
          <MenuItem key={index} onClick={() => setAnchorEl(null)}>
            {not}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
