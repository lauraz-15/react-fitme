import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import logo from '../assets/logo-resized.png'

const NavBar = () => {
  return (
<Navbar bg="light" expand="md" fixed="top">
   <Container>
  <Navbar.Brand href="#home"><img src={logo} height="60px" alt="site logo"/></Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse bg="light" id="basic-navbar-nav">
    <Nav className="ml-auto text-right">
      <Nav.Link>
        Home
        <i className="fa-solid fa-house"></i></Nav.Link>
      <Nav.Link>
      Sign In
      <i className="fa-solid fa-right-to-bracket"></i>
      </Nav.Link>
      <Nav.Link>
        Sign Up
        <i className="fa-solid fa-user-plus"></i>
        </Nav.Link>
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>
  )
}

export default NavBar