import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Asset from "../../components/Asset";

import appStyles from "../../App.module.css";

import { useCurrUser } from "../../contexts/CurrUserContext";

function AccountPage() {
  const [loaded, setLoaded] = useState(false);
  const currUser = useCurrUser();

  useEffect(() => {
      setLoaded(true);
  }, [])

  const mainAccount = (
    <>
      <Row noGutters className="px-3 text-center">
        <Col lg={3} className="text-lg-left">
          <p>Image</p>
        </Col>
        <Col lg={6}>
          <h3 className="m-2">Account username</h3>
          <p>Account info</p>
        </Col>
        <Col lg={3} className="text-lg-right">
        <p>Follow - button</p>
        </Col>
        <Col className="p-3">account text</Col>
      </Row>
    </>
  );

  const mainAccountImages = (
    <>
      <hr />
      <p className="text-center">images</p>
      <hr />
    </>
  );

  return (
    <Row>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <Container className={appStyles.Content}>
          {loaded ? (
            <>
              {mainAccount}
              {mainAccountImages}
            </>
          ) : (
            <p>spinning</p>
          )}
        </Container>
      </Col>
    </Row>
  );
}

export default AccountPage;