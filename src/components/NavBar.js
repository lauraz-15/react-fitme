import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import logo from "../assets/logo-resized.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import { useCurrUser, useSetCurrUser } from "../contexts/CurrUserContext";
import Profile from "./Profile";
import axios from "axios";
import Toggle from "../hooks/Toggle";
import { removeTokenStamp } from "../utilities/utilities";

/**
 * Display navbar
 */
const NavBar = () => {
  const currUser = useCurrUser();
  const setCurrUser = useSetCurrUser();

  /**
   * Send a logout request to the api
   * remove the access token
   */
  const handleLogOut = async () => {
    try {
      await axios.post("/dj-rest-auth/logout/");
      setCurrUser(null);
      removeTokenStamp();
    } catch (err) {}
  };

  const { opened, setOpened, ref } = Toggle();

  /**
   * Display the following menu items if the user is not logged in
   */
  const notAuthenticatedView = (
    <>
      <NavLink
        to="/login"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        Log In
        <i className="fa-solid fa-right-to-bracket"></i>
      </NavLink>
      <NavLink
        to="/signup"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        Sign Up
        <i className="fa-solid fa-user-plus"></i>
      </NavLink>
    </>
  );

  /**
   * Display the following menu items if the user iS logged in
   */
  const authenticatedView = (
    <div>
      <NavLink
        to="/main"
        exact
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <i className="fa-solid fa-house"></i>
      </NavLink>
      <NavLink
        to="/images/add"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <i className="fa-solid fa-square-plus"></i>
      </NavLink>
      <NavLink
        to="/kudos"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <i className="fa-solid fa-thumbs-up"></i>
      </NavLink>
      <NavLink to="/" className={styles.NavLink} onClick={handleLogOut}>
        <i className="fa-solid fa-person-walking-arrow-right"></i>
      </NavLink>
      <NavLink
        to={`/accounts/${currUser?.account_id}`}
        className={styles.NavLink}
      >
        <Profile src={currUser?.account_image} />
      </NavLink>
    </div>
  );

  return (
    <Navbar expanded={opened} className={styles.NavBar} expand="md" fixed="top">
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} height="60px" alt="site logo" />
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          ref={ref}
          onClick={() => setOpened(!opened)}
        />
        <Navbar.Collapse bg="light" id="basic-navbar-nav">
          <Nav className="ml-auto text-right">
            {currUser ? authenticatedView : notAuthenticatedView}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
