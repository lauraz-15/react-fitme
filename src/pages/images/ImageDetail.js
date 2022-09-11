import React from 'react'
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";

const ImageDetail = () => {
    return (
        <Row className="h-100">
          <Col className="py-2 p-0 p-lg-2" lg={8}>
            <Container>
                Image
            </Container>
            <Container className={appStyles.Content}>
              Comments
            </Container>
          </Col>
        </Row>
      );
}

export default ImageDetail