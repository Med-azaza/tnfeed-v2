import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import styles from "./Profile.module.scss";

export default function Profile({ token, userData }) {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.coverPic}>
        {userData.coverPicture && (
          <img
            src={`${process.env.NEXT_PUBLIC_BASE_API}images/${userData.coverPicture}`}
            alt=""
          />
        )}
      </div>
      <div className={styles.profilePic}>
        {userData.profilePicture && (
          <img
            src={`${process.env.NEXT_PUBLIC_BASE_API}images/${userData.profilePicture}`}
            alt=""
          />
        )}
      </div>
      <p className={styles.name}>{userData.name}</p>
    </div>
  );
}
