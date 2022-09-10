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
         Form
        </Container>
        <Container>
           <Link to="/login">
           Registered users, please log in here: <san>Log In</san>
           </Link>
       </Container>
    </div>
 
  );
};

export default SignUpForm;