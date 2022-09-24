import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Container from "react-bootstrap/Container";

import Image from "./Image";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import { Button, FormControl } from "react-bootstrap";

import btnStyles from "../../styles/Buttons.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreImages } from "../../utilities/utilities";
import { useCurrUser } from "../../contexts/CurrUserContext";

function ImagesPage({ message, filter = "" }) {
  const [images, setImages] = useState({ results: [] });
  const [loaded, setLoaded] = useState(false);
  const { pathname } = useLocation();
  const currUser = useCurrUser();
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
  }, [filter, search, pathname, currUser]);

  return (

    <Row className="h-100 justify-content-lg-center">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <Form onSubmit={(event) => event.preventDefault()}>
          <FormControl 
          type="text" 
          placeholder="Search.." 
          className="mr-sm-2 mb-3"
          rounded
          value={search}
          onChange={(event) => setSearch(event.target.value)} />
        </Form>
    
        {loaded ? (
          <>
            {images.results.length ? (
              <InfiniteScroll
                children={
                  images.results.map((image) => (
                    <Image key={image.id} {...image} setImages={setImages} />
                  ))
                }
                dataLength={images.results.length}
                loader={"spinning"}
                hasMore={!!images.next}
                next={() => fetchMoreImages(images, setImages)}
              />
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