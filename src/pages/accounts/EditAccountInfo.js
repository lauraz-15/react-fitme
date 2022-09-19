import React, { useState, useEffect, useRef } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

import { useHistory, useParams } from "react-router-dom";
import { useCurrUser, useSetCurrUser } from "../../contexts/CurrUserContext";
import { axiosReq } from "../../api/axiosDefaults";


const EditAccountInfo = () => {
  const currUser = useCurrUser();
  const setCurrUser = useSetCurrUser();
  const { id } = useParams();
  const history = useHistory();
  const photoUpload = useRef();

  const [accountInfo, setAccountInfo] = useState({
    current_weight: "",
    goal_weight: "",
    content: "",
    image: "",
  });

  const { current_weight, goal_weight, content, image } = accountInfo;

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleMount = async () => {
      if (currUser?.account_id?.toString() === id) {
        try {
          const { data } = await axiosReq.get(`/accounts/${id}/`);
          const { current_weight, goal_weight, content, image } = data;
          setAccountInfo({ current_weight, goal_weight, content, image });
        } catch (err) {
          console.log(err);
          history.push("/");
        }
      } else {
        history.push("/");
      }
    };

    handleMount();
  }, [currUser, history, id]);

  const handleChange = (event) => {
    setAccountInfo({
      ...accountInfo,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newData = new FormData();
    newData.append("current_weight", current_weight);
    newData.append("goal_weight", goal_weight);
    newData.append("content", content);

    if (photoUpload?.current?.files[0]) {
        newData.append("image", photoUpload?.current?.files[0]);
    }

    try {
      const { data } = await axiosReq.put(`/accounts/${id}/`, newData);
      setCurrUser((currUser) => ({
        ...currUser,
        account_image: data.image,
      }));
      history.goBack();
    } catch (err) {
      console.log(err);
      setErrors(err.response?.data);
    }
  };

  const infoFields = (
    <>
      <Form.Group>
        <Form.Label>Current weight</Form.Label>
        <Form.Control as="input" value={current_weight} onChange={handleChange}
          name="current_weight" rows={7}/>
      </Form.Group>
      <Form.Group>
        <Form.Label>Goal weight</Form.Label>
        <Form.Control as="input" value={goal_weight} onChange={handleChange}
          name="goal_weight" rows={7}/>
      </Form.Group>
      <Form.Group>
        
        <Form.Label>About</Form.Label>
        <Form.Control as="textarea" value={content} onChange={handleChange}
          name="content" rows={7}/>
      </Form.Group>

      {errors?.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Button 
        onClick={() => history.goBack()}>
        cancel
      </Button>
      <Button type="submit">
        save
      </Button>
    </>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2 text-center" md={7} lg={6}>
          <Container>
            <Form.Group>
              {image && (
                <figure>
                  <Image src={image} fluid />
                </figure>
              )}
              {errors?.image?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
              <div>
                <Form.Label htmlFor="image-upload">
                  Change the image
                </Form.Label>
              </div>
              <Form.File
                id="image-upload" ref={photoUpload}
                accept="image/*" onChange={(e) => {
                  if (e.target.files.length) {
                    setAccountInfo({
                      ...accountInfo,
                      image: URL.createObjectURL(e.target.files[0]),
                    });
                  }
                }}
              />
            </Form.Group>
          </Container>
        </Col>
        <Col md={5} lg={6} className="d-none d-md-block p-0 p-md-2 text-center">
          <Container>{infoFields}</Container>
        </Col>
      </Row>
    </Form>
  );
};

export default EditAccountInfo;