import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";

// import styles from "../../styles/AddEditImage.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Buttons.module.css";

function AddImageForm() {
  const [imageInfo, setImageInfo] = useState({
    picture: "",
    description: "",
  });

  const { picture, description} = imageInfo;
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setImageInfo({
        ...imageInfo,
        [event.target.name]: event.target.value,
    });
  };

  const handlePicture = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(picture);
      setImageInfo({
        ...imageInfo,
        picture: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  return (
    <div className={appStyles.Body}>
        <Container fluid="md">
           <Row className="justify-content-md-center">
            <Col lg={4}>
                <h1>Add Image</h1>
                <Form>

                <Form.Group>
                <Form.Label className="d-none">Description</Form.Label>
                  <figure>
                    <Image src={picture} rounded />
                  </figure>
                <Form.File accept="image/*" 
                id="exampleFormControlFile"
                onChange={handlePicture} />
                </Form.Group>
                
                    {errors.picture?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>{message}</Alert>
                    ))}

                <Form.Group controlId="description">
                    <Form.Label className="d-none">Description</Form.Label>
                    <Form.Control 
                    type="description" 
                    placeholder="description" 
                    name="description" 
                    value={description}
                    onChange={handleChange}/>
                </Form.Group>

                    {errors.description?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>{message}</Alert>
                    ))}
                      
                <Button className={btnStyles.Button} variant="primary" type="submit">
                    Post
                </Button>
                {errors.non_field_errors?.map((message, idx) => (
                        <Alert variant="warning" className="mt-4" key={idx}>{message}</Alert>
                    ))}
            </Form>
            </Col>
        </Row>
        </Container>
    </div>
  );
}

export default AddImageForm;