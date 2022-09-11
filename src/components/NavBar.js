import React, { useState } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import logo from '../assets/logo-resized.png'
import styles from '../styles/NavBar.module.css'
import { NavLink } from "react-router-dom";
import { useCurrUser, useSetCurrUser } from '../contexts/CurrUserContext';
import Profile from './Profile';
import axios from "axios";

const NavBar = () => {
  const currUser = useCurrUser();
  const setCurrUser = useSetCurrUser();

  const handleLogOut = async (event) => {
    try {
      await axios.post('/dj-rest-auth/logout/');
      setCurrUser(null);
    } catch(err){
      console.log(err)
    }
 }

  const notAuthenticatedView = (
    <>
    <NavLink to="/login"  className={styles.NavLink} activeClassName={styles.Active}>
    Log In
    <i className="fa-solid fa-right-to-bracket"></i>
    </NavLink>
    <NavLink to="/signup"  className={styles.NavLink} activeClassName={styles.Active}>
      Sign Up
      <i className="fa-solid fa-user-plus"></i>
    </NavLink>
    </>
  )


  const authenticatedView = (
        <div className={styles.Main}>
        <NavLink to="/main" exact className={styles.NavLink} activeClassName={styles.Active}>
        <i className="fa-solid fa-house"></i>
        </NavLink>
        <NavLink to="/images/add"  className={styles.NavLink} activeClassName={styles.Active}>
        <i className="fa-solid fa-square-plus"></i>
        </NavLink>
        <NavLink to="/kudos"  className={styles.NavLink} activeClassName={styles.Active}>
        <i className="fa-solid fa-thumbs-up"></i>
        </NavLink>
        <NavLink to="/" 
        className={styles.NavLink}
        onClick={handleLogOut}>
        <i className="fa-solid fa-person-walking-arrow-right"></i>
        </NavLink>
        <NavLink to={`/accounts/${currUser?.account_id}`}
        className={styles.NavLink}>
        <Profile src={currUser?.account_image} text="Account"/>
        </NavLink>
        </div>   
  )

  return (
<Navbar className={styles.NavBar}  expand="md" fixed="top">
   <Container>
    <NavLink to="/">
      <Navbar.Brand><img src={logo} height="60px" alt="site logo"/></Navbar.Brand>
    </NavLink>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse bg="light" id="basic-navbar-nav">
    <Nav className="ml-auto text-right">
    {currUser ? authenticatedView : notAuthenticatedView}
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>
  )
}

export default NavBar