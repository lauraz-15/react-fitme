import React, { useEffect, useState } from "react";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import { useCurrUser, useSetCurrUser } from "../../contexts/CurrUserContext";
import { axiosRes } from "../../api/axiosDefaults";
import { useHistory, useParams } from "react-router-dom";


const EditUsername = () => {

  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState({});

  const history = useHistory();
  const { id } = useParams();

  const currUser = useCurrUser();
  const setCurrUser = useSetCurrUser();

  useEffect(() => {
    if (currUser?.account_id?.toString() === id) {
      setUsername(currUser.username);
    } else {
      history.push("/");
    }
  }, [currUser, history, id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put("/dj-rest-auth/user/", {
        username,
      });
      setCurrUser((prevUser) => ({
        ...prevUser,
        username,
      }));
      history.goBack();
    } catch (err) {
      console.log(err);
      setErrors(err.response?.data);
    }
  };

  return (
    <Row>
      <Col className="py-2 mx-auto text-center" md={6}>
        <Container>
          <Form onSubmit={handleSubmit} className="my-2">
            <Form.Group>
              <Form.Label>Edit My Username</Form.Label>
              <Form.Control
                placeholder="username" type="text" value={username}
                onChange={(event) => setUsername(event.target.value)}/>
            </Form.Group>
            {errors?.username?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
            <Button onClick={() => history.goBack()}>
              Cancel
            </Button>
            <Button type="submit">
              Update
            </Button>
          </Form>
        </Container>
      </Col>
    </Row>
  );
};

export default EditUsername;