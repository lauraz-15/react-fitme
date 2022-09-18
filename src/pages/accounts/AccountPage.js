import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Image from "../images/Image";
import appStyles from "../../App.module.css";

import { useCurrUser } from "../../contexts/CurrUserContext";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import { useAccountData, useSetAccountData } from "../../contexts/AccountDataContext";
import Profile from "../../components/Profile";
import { Media } from "react-bootstrap";

function AccountPage() {
  const [loaded, setLoaded] = useState(false);
  const currUser = useCurrUser();
  const {id} = useParams();
  const setAccountData = useSetAccountData();
  const {pageAccount} = useAccountData();
  const [account] = pageAccount.results;


  useEffect(() => {
    const fetchInfo = async () => {
        try {
            const [{data: pageAccount}] = await Promise.all([
                axiosReq.get(`/accounts/${id}/`)
            ])
            setAccountData(prevState => ({
                ...prevState,
                pageAccount: {results: [pageAccount]} 
            }))
            setLoaded(true);
        } catch(err) {
            console.log(err)
        }
    }
      fetchInfo()
  }, [id, setAccountData])

  const mainAccount = (
    <>
      <Row noGutters className="px-3 text-center">
        <Col lg={3} className="text-lg-left">
            <Media>
                <Profile src={currUser?.account_image} height={200}/>
            </Media>
           

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