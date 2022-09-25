import React, { useRef, useState } from "react";
import axios from "axios";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Alert } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Link, useHistory } from "react-router-dom";
import { Image } from "react-bootstrap";
import { Redirect } from "../../hooks/Redirect";

import styles from "../../styles/AddEditImageForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Buttons.module.css";

/**
 * Render Form to add and image
 */
function AddImageForm() {
  Redirect("loggedOut");
  const [imageInfo, setImageInfo] = useState({
    picture: "",
    description: "",
  });

  const { picture, description } = imageInfo;

  const pictureUpload = useRef(null);
  const history = useHistory();

  const [errors, setErrors] = useState({});

  /**
   * Display typed text on the frontend
   */
  const handleChange = (event) => {
    setImageInfo({
      ...imageInfo,
      [event.target.name]: event.target.value,
    });
  };

  /**
   * Save user's uplaoded image
   * display on the frontend
   */
  const handlePicture = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(picture);
      setImageInfo({
        ...imageInfo,
        picture: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  /**
   * Send the image and data to the api with post request
   */
  const handleSumbit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("picture", pictureUpload.current.files[0]);
    formData.append("description", description);
    try {
      const { data } = await axios.post("/images/", formData);
      history.push(`/images/${data.id}`);
    } catch (err) {
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  return (
    <div className={appStyles.Body}>
      <Container fluid="md">
        <Row className="justify-content-md-center">
          <Col lg={8}>
            <h1>Add Image</h1>
            <Form onSubmit={handleSumbit}>
              <Form.Group>
                <Form.Label className="d-none">Upload image</Form.Label>
                <Form.File
                  accept="image/*"
                  name="upload image"
                  type="file"
                  id="exampleFormControlFile"
                  onChange={handlePicture}
                  ref={pictureUpload}
                />
              </Form.Group>

              {errors.picture?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}

              <Form.Group controlId="description">
                <Form.Label className="d-none">Description</Form.Label>
                <Form.Control
                  type="description"
                  placeholder="description"
                  name="description"
                  value={description}
                  onChange={handleChange}
                />
              </Form.Group>

              {errors.description?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}

              <Button
                className={btnStyles.Button}
                variant="primary"
                type="submit"
              >
                Post
              </Button>
              {errors.non_field_errors?.map((message, idx) => (
                <Alert variant="warning" className="mt-4" key={idx}>
                  {message}
                </Alert>
              ))}
              <figure>
                <Image src={picture} rounded className={styles.Picture} alt={description}/>
              </figure>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AddImageForm;
