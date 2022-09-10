import React from "react";
import { Link } from "react-router-dom";

import styles from "../styles/SignUpLogInForm.module.css";
import btnStyles from "../styles/Buttons.module.css";
import appStyles from "../App.module.css";
import { Form, Button, Image, Col, Row, Container } from "react-bootstrap";

const SignUpForm = () => {
  return (
    <div className={appStyles.Body}>
        <Container fluid="md">
           <Row className="justify-content-md-center">
            <Col lg={4}>
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
            
                <Button className={btnStyles.Button} variant="primary" type="submit">
                    Sign Up
                </Button>
            </Form>
        <div className={styles.LogIn}>
             <h4>Registered users, please log in here:</h4>
             <Link to="/login">
                <Button className={btnStyles.Button}>Log In</Button>
            </Link>
        </div>
            </Col>
        </Row>
        </Container>
    </div>
 
  );
};

export default SignUpForm;