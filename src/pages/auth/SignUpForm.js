import React, {useState} from "react";
import { Link } from "react-router-dom";

import styles from "../../styles/SignUpLogInForm.module.css";
import btnStyles from "../../styles/Buttons.module.css";
import appStyles from "../../App.module.css";
import { Form, Button, Image, Col, Row, Container, Alert } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const SignUpForm = () => {
    const [signUpInfo, setSignupInfo] = useState({
        username: "",
        password1: "",
        password2: "",
      });
    
    const { username, password1, password2 } = signUpInfo;
    const history = useHistory();
    const [errors, setErros] = useState({

    })
    const handleChange = (event) => {
        setSignupInfo({
            ...signUpInfo,
            [event.target.name]: event.target.value,
        });
    };

    const handleSumbit = async (event) => {
        event.preventDefault();
        try {
          await axios.post('/dj-rest-auth/registration/', signUpInfo)
          history.push('/login')
        } catch(err){
            setErros(err.response?.data)
        }
    }

  return (
    <div className={appStyles.Body}>
        <Container fluid="md">
           <Row className="justify-content-md-center">
            <Col lg={4}>
                <h1>Sign Up</h1>
                <Form onSubmit={handleSumbit}>
                <Form.Group controlId="username">
                    <Form.Label className="d-none">Username</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="username" 
                    name="username" 
                    value={username}
                    onChange={handleChange}/>
                </Form.Group>
                    {errors.username?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>{message}</Alert>
                    ))}
                <Form.Group controlId="password1">
                    <Form.Label className="d-none">Password</Form.Label>
                    <Form.Control 
                    type="password" 
                    placeholder="Password" 
                    name="password1" 
                    value={password1}
                    onChange={handleChange}/>
                </Form.Group>
                    {errors.password1?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>{message}</Alert>
                    ))}
                <Form.Group controlId="password2">
                    <Form.Label className="d-none">Password</Form.Label>
                    <Form.Control 
                    type="password" 
                    placeholder="Confirm Password" 
                    name="password2" 
                    value={password2}
                    onChange={handleChange}/>
                </Form.Group>
                {errors.password2?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>{message}</Alert>
                    ))}          
                <Button className={btnStyles.Button} variant="primary" type="submit">
                    Sign Up
                </Button>
                {errors.non_field_errors?.map((message, idx) => (
                        <Alert variant="warning" className="mt-4" key={idx}>{message}</Alert>
                    ))}
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