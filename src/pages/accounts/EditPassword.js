import React, { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { useCurrUser } from "../../contexts/CurrUserContext";
import { axiosRes } from "../../api/axiosDefaults";
import { useHistory, useParams } from "react-router-dom";

/**
 * Render the edit password form
 */
const EditPassword = () => {
  const history = useHistory();
  const { id } = useParams();
  const currUser = useCurrUser();

  const [userInfo, setUserInfo] = useState({
    updated_password1: "",
    updated_password2: "",
  });
  const { updated_password1, updated_password2 } = userInfo;
  const [errors, setErrors] = useState({});

  /**
   * Get the information from the input fields
   */
  const handleChange = (event) => {
    setUserInfo({
      ...userInfo,
      [event.target.name]: event.target.value,
    });
  };

  /**
   * Redirect the user if they are trying to access the page for another account
   */

  useEffect(() => {
    if (currUser?.account_id?.toString() !== id) {
      history.push("/");
    }
  }, [currUser, history, id]);

  /**
   * Post the data on the Api
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.post("/dj-rest-auth/password/change/", userInfo);
      history.goBack();
    } catch (err) {
      // console.log(err);
      setErrors(err.response?.data);
    }
  };

  return (
    <Row>
      <Col className="py-2 mx-auto text-center" md={6}>
        <Container>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Update Password</Form.Label>
              <Form.Control
                placeholder="my new password"
                type="password"
                value={updated_password1}
                onChange={handleChange}
                name="updated_password1"
              />
            </Form.Group>
            {errors?.updated_password1?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
            <Form.Group>
              <Form.Label>Confirm new password</Form.Label>
              <Form.Control
                placeholder="confirm new password"
                type="password"
                value={updated_password2}
                onChange={handleChange}
                name="updated_password2"
              />
            </Form.Group>
            {errors?.updated_password2?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
            <Button onClick={() => history.goBack()}>Cancel</Button>
            <Button type="submit">Update</Button>
          </Form>
        </Container>
      </Col>
    </Row>
  );
};

export default EditPassword;
