import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Image from "./Image";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import { FormControl } from "react-bootstrap";

import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreImages } from "../../utilities/utilities";
import { useCurrUser } from "../../contexts/CurrUserContext";

/**
 * Display a list of images.
 */
function ImagesPage({ message, filter = "" }) {
  const [images, setImages] = useState({ results: [] });
  const [loaded, setLoaded] = useState(false);
  const { pathname } = useLocation();
  const currUser = useCurrUser();
  const [search, setSearch] = useState("");

  /**
   * Retrieve images from the API.
   * Return search results.
   */
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const { data } = await axiosReq.get(
          `/images/?${filter}search=${search}`
        );
        setImages(data);
        setLoaded(true);
      } catch (err) {}
    };

    /**
     * Add timer delay to display images
     */
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
            onChange={(event) => setSearch(event.target.value)}
          />
        </Form>

        {loaded ? (
          <>
            {images.results.length ? (
              <InfiniteScroll
                children={images.results.map((image) => (
                  <Image key={image.id} {...image} setImages={setImages} />
                ))}
                dataLength={images.results.length}
                loader={"spinning"}
                hasMore={!!images.next}
                next={() => fetchMoreImages(images, setImages)}
              />
            ) : (
              <Container>
                <p message={message}>Follow a user or give some kudos!</p>
              </Container>
            )}
          </>
        ) : (
          <Container></Container>
        )}
      </Col>
    </Row>
  );
}

export default ImagesPage;
