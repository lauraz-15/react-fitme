import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import logo from '../assets/logo-resized.png'
import styles from '../styles/NavBar.module.css'
import { NavLink } from "react-router-dom";

const NavBar = () => {


  return (
<Navbar className={styles.NavBar} bg="light" expand="md" fixed="top">
   <Container>
    <NavLink to="/">
      <Navbar.Brand><img src={logo} height="60px" alt="site logo"/></Navbar.Brand>
    </NavLink>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse bg="light" id="basic-navbar-nav">
    <Nav className="ml-auto text-right">
      <NavLink to="/" exact className={styles.NavLink} activeClassName={styles.Active}>
        Home
        <i className="fa-solid fa-house"></i>
      </NavLink>
      <NavLink to="/login"  className={styles.NavLink} activeClassName={styles.Active}>
      Log In
      <i className="fa-solid fa-right-to-bracket"></i>
      </NavLink>
      <NavLink to="/signup"  className={styles.NavLink} activeClassName={styles.Active}>
        Sign Up
        <i className="fa-solid fa-user-plus"></i>
      </NavLink>
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>
  )
}

export default NavBar