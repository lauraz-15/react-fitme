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
import { Button, Media } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreImages } from "../../utilities/utilities";

function AccountPage() {
  const [loaded, setLoaded] = useState(false);
  const currUser = useCurrUser();
  const {id} = useParams();
  const setAccountData = useSetAccountData();
  const {pageAccount} = useAccountData();
  const [account] = pageAccount.results;
  const is_owner = currUser?.username === account?.owner;
  const [images, setImages] = useState({ results: [] });

  useEffect(() => {
    const fetchInfo = async () => {
        try {
            const [{data: pageAccount}, {data: images}] = 
            await Promise.all([
                axiosReq.get(`/accounts/${id}/`),
                axiosReq.get(`/images/?owner__account=${id}/`)
            ])
            setAccountData(prevState => ({
                ...prevState,
                pageAccount: {results: [pageAccount]} 
            }))
            setImages(images);
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
          <h3 className="m-2">{account?.owner}</h3>
          <Row>
            <Col>
               <p>Imges: <span>{account?.images_count}</span></p>
            </Col>
            <Col>
               <p>Followers: <span>{account?.followers_count}</span></p>
            </Col>
            <Col>
               <p>Follow: <span>{account?.following_count}</span></p>
            </Col>
          </Row>
          <>
          <Row>
            <Col>
              <p>Curent weight: <span>{account?.current_weight}</span></p>
            </Col>
            <Col>
              <p>Goal weight: <span>{account?.goal_weight}</span></p>
            </Col>
          </Row>
          </>
        </Col>
        <Col lg={3} className="text-lg-right">
        <p>Follow - button</p>

           {currUser && !is_owner && 
           (account?.following_id ? (
            <Button>Unfollow</Button>
           ) : (
            <Button>Follow</Button>)
            )}
        </Col>
        <Col className="p-3">
          <p>About: <span>{account?.content}</span></p>
        </Col>
      </Row>
    </>
  );

  const mainAccountImages = (
    <>
      <hr />
        <Col>
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
          <p>This user hasn't posted anythign yet..</p>
        )}
        </Col>
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