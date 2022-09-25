import React from "react";
import styles from "../styles/Profile.module.css";

/**
 * Display styled profile/account photo for images and comments
 */
const Profile = ({ src, height = 50, text }) => {
  return (
    <span>
      <img
        className={styles.Profile}
        src={src}
        height={height}
        width={height}
        alt="profile photo"
      />
    </span>
  );
};

export default Profile;
