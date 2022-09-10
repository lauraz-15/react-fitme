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
      <Navbar.Brand href="#home"><img src={logo} height="60px" alt="site logo"/></Navbar.Brand>
    </NavLink>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse bg="light" id="basic-navbar-nav">
    <Nav className="ml-auto text-right">
      <NavLink to="/">
        Home
        <i className="fa-solid fa-house"></i>
      </NavLink>
      <NavLink to="/signin">
      Sign In
      <i className="fa-solid fa-right-to-bracket"></i>
      </NavLink>
      <NavLink to="/signup">
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