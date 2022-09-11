import React from 'react'
import styles from '../styles/Profile.module.css'


const Profile = ({ src, height = 50, text }) => {
  
  return (
    <span>
        <img className={styles.Profile} src={src} 
        height={height} width={height} alt="profile photo"/>
        {text}
    </span>
  )
}

export default Profile