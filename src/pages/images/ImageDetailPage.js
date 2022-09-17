import React, { useEffect, useState } from 'react'
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from 'react-router';
import { axiosReq } from '../../api/axiosDefaults';
import Image from './Image.js'
import AddCommentForm from '../comments/AddCommentForm';
import { useCurrUser } from '../../contexts/CurrUserContext'

const ImageDetailPage = () => {
    const { id } = useParams();
    const [image, setImage] = useState({ results: [] })

    const currUser = useCurrUser();
    const account_image = currUser?.account_image;
    const [comments, setComments] = useState({ results: [] });

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: image }] = await Promise.all([
                    axiosReq.get(`/images/${id}`),
                ])
                setImage({ results: [image]});
                console.log([{ data: image }])
                console.log(image)
            } catch (err) {
                console.log(err)
            }
        }
        handleMount();
    }, [id])
    
    return (
        <Row className="h-100">
          <Col className="py-2 p-0 p-lg-2" lg={8}>
            <Image {...image.results[0]} setImages={setImage} imagePage/>
            <Container className={appStyles.Content}>
            {currUser ? (
                <AddCommentForm
                account_id={currUser.account_id}
                accountImage={account_image}
                image={id}
                setImage={setImage}
                setComments={setComments}/>
              ) : comments.results.length ? (
                "Comments"
              ) : null}
            </Container>
          </Col>
        </Row>
      );
}

export default ImageDetailPage