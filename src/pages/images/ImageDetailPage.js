import React, { useEffect, useState } from 'react'
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from 'react-router';
import axios from 'axios';
import { axiosReq } from '../../api/axiosDefaults';


const ImageDetailPage = () => {
    const { id } = useParams();
    const [image, setImage] = useState({ results: [] })

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: image }] = await Promise.all([
                    axiosReq.get(`/images/${id}`),
                ])
                console.log([{ data: image }])
            } catch (err) {
                console.log(err)
            }
        }
        handleMount();
    }, [id])
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

export default ImageDetailPage