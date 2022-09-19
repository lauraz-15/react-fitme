import React from 'react'
import nothing from "../assets/nothing_found.png"
import { Col, Container, Image } from 'react-bootstrap'

const PageNotFound = () => {
  return (
    <Container>
    
        <Col className="py-2 mx-auto text-center" md={6}>
        <Image src={nothing}/>
        <h2>
        The page you are looking for does not exist!
        </h2>
        </Col>
    </Container>
  )
}

export default PageNotFound