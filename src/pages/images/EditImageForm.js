import React, {  useEffect, useRef, useState } from "react";
import axios from "axios";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { Image } from "react-bootstrap";

import styles from "../../styles/AddEditImageForm.module.css"
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Buttons.module.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";

function EditImageForm() {
  const [imageInfo, setImageInfo] = useState({
    picture: "",
    description: "",
  });

  const { picture, description} = imageInfo;

  const pictureUpload = useRef(null)
  const history = useHistory();
  const {id} = useParams();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const {data} = await axiosReq.get(`/images/${id}/`)
        const { picture, description, is_owner} = data;

        is_owner ? setImageInfo({picture, description}) : history.push('/');
      } catch(err) {
        console.log(err);
      }
    };

    handleMount();
  }, [history, id])

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

  const handleSumbit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append('picture', pictureUpload.current.files[0]);
    formData.append('description', description)
    try {
      const { data } = await axios.post('/images/', formData)
      history.push(`/images/${data.id}`)
    } catch(err){
      console.log(err)
      if (err.response?.status !== 401) {
        setErrors(err.response?.data)
      }
    }
  }

  return (
    <div className={appStyles.Body}>
        <Container fluid="md">
           <Row className="justify-content-md-center">
            <Col lg={8}>
                <h1>Add Image</h1>
                <Form onSubmit={handleSumbit}>
                <Form.Group>
                <Form.Label className="d-none">Description</Form.Label>
  
                <Form.File accept="image/*" 
                id="exampleFormControlFile"
                onChange={handlePicture}
                ref={pictureUpload} />
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
                    <figure>
                    <Image src={picture} rounded className={styles.Picture} />
                  </figure>
            </Form>
            </Col>
        </Row>
        </Container>
    </div>
  );
}

export default EditImageForm;