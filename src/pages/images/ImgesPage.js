import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
// import Image from "react-bootstrap";
import Container from "react-bootstrap/Container";

// import nothing_found from "../../assets/nothing_found"
import Image from "./Image";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import { Button, FormControl } from "react-bootstrap";

import btnStyles from "../../styles/Buttons.module.css";

function ImagesPage({ message, filter = "" }) {
  const [images, setImages] = useState({ results: [] });
  const [loaded, setLoaded] = useState(false);
  const { pathname } = useLocation();
  
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchImages = async () => {
        try {
            const {data} = await axiosReq.get(`/images/?${filter}search=${search}`);
            setImages(data);
            setLoaded(true);
        } catch(err) {
            console.log(err)
        }
    };

    setLoaded(false);
    const delay = setTimeout(() => {
      fetchImages();
    }, 1000);

    return () => {
      clearTimeout(delay);
    };
    fetchImages();
  }, [filter, search, pathname]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <Form onSubmit={(event) => event.preventDefault()}>
          <FormControl 
          type="text" 
          placeholder="Search" 
          className="mr-sm-2"
          value={search}
          onChange={(event) => setSearch(event.target.value)} />
          <Button className={btnStyles.Button} type="submit">Search</Button>
        </Form>
    
        {loaded ? (
          <>
            {images.results.length ? (
              images.results.map((image) => (
                <Image key={image.id} {...image} setImages={setImages} />
              ))
            ) : (
              <Container>
                  <p message={message}>nothing found</p>
              </Container>
            )}
          </>
        ) : (
          <Container>
            spinning
          </Container>
        )}
      </Col>
    </Row>
  );
}

export default ImagesPage;