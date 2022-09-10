import React from "react";
import { Link } from "react-router-dom";

// import styles from "../../styles/SignUpLogInForm.module.css";
// import btnStyles from "../../styles/Buttons.module.css";
// import appStyles from "../../App.module.css";

import { Form, Button, Image, Col, Row, Container } from "react-bootstrap";

const SignUpForm = () => {
  return (
    <div>
        <Container>
            <h1>Sign Up</h1>
            <Form>
            <Form.Group controlId="username">
                <Form.Label className="d-none">Username</Form.Label>
                <Form.Control type="text" placeholder="username" name="username"/>
            </Form.Group>

            <Form.Group controlId="password1">
                <Form.Label className="d-none">Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="password1"/>
            </Form.Group>

            <Form.Group controlId="password2">
                <Form.Label className="d-none">Password</Form.Label>
                <Form.Control type="password" placeholder="Confirm Password" name="password2"/>
            </Form.Group>
         
            <Button variant="primary" type="submit">
                Submit
            </Button>
            </Form>
        </Container>
        <Container>
           <Link to="/login">
           Registered users, please log in here: <span>Log In</span>
           </Link>
       </Container>
    </div>
 
  );
};

export default SignUpForm;