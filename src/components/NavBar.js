import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import logo from '../assets/logo-resized.png'

const NavBar = () => {
  return (
<Navbar bg="light" expand="md" fixed="top">
   <Container>
  <Navbar.Brand href="#home"><img src={logo} height="60px" alt="site logo"/></Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#link">Link</Nav.Link>
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>
  )
}

export default NavBar