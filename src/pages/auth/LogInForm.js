import React, { useState } from "react";

import btnStyles from "../../styles/Buttons.module.css";
import appStyles from "../../App.module.css";
import {
  Form,
  Button,
  Col,
  Row,
  Container,
  Alert,
} from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useSetCurrUser } from "../../contexts/CurrUserContext";
import { setTokenStamp } from "../../utilities/utilities";
import { Redirect } from "../../hooks/Redirect";

/**
 * Render the Login form.
 */
const LogInForm = () => {
  const setCurrUser = useSetCurrUser();
  Redirect("loggedIn");

  const [logInInfo, setLogInInfo] = useState({
    username: "",
    password: "",
  });

  const { username, password } = logInInfo;
  const history = useHistory();
  const [errors, setErros] = useState({});

  /**
   * Get the user typed information
   */
  const handleChange = (event) => {
    setLogInInfo({
      ...logInInfo,
      [event.target.name]: event.target.value,
    });
  };

  /**
   * Post the inputed data to the API.
   * Set token time stamp
   * Redirect the user to the page they were on
   * Display error message if invalid data entered
   */
  const handleSumbit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/dj-rest-auth/login/", logInInfo);
      setCurrUser(data.user);
      setTokenStamp(data);
      history.goBack();
    } catch (err) {
      setErros(err.response?.data);
    }
  };

  return (
    <div className={appStyles.Body}>
      <Container fluid="md">
        <Row className="justify-content-md-center">
          <Col lg={4}>
            <h1>Log In</h1>
            <Form onSubmit={handleSumbit}>
              <Form.Group controlId="username">
                <Form.Label className="d-none">Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="username"
                  name="username"
                  value={username}
                  onChange={handleChange}
                />
              </Form.Group>
              {errors.username?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
              <Form.Group controlId="password">
                <Form.Label className="d-none">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
              </Form.Group>
              {errors.password?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
              <Button
                className={btnStyles.Button}
                variant="primary"
                type="submit"
              >
                Log In
              </Button>
              {errors.non_field_errors?.map((message, idx) => (
                <Alert variant="warning" className="mt-4" key={idx}>
                  {message}
                </Alert>
              ))}
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LogInForm;
