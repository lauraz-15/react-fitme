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

function ImagesPage({ message, filter = "" }) {
  const [images, setImages] = useState({ results: [] });
  const [loaded, setLoaded] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchImages = async () => {
        try {
            const {data} = await axiosReq.get(`/images/${filter}`)
            setImages(data)
            setLoaded(true)
        } catch(err) {
            console.log(err)
        }
    } 
    setLoaded(false)
    fetchImages()
  }, [filter, pathname]);
 

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        something
        {loaded ? (
          <>
            {images.results.length ? (
              images.results.map((image) => (
                <Image key={image.id} {...image} setImages={setImages} />
              ))
            ) : (
            //   <Container>
            //     <Image src={nothing_found}/>
            //   </Container>
            <p>nothing found</p>
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