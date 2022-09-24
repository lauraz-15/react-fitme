import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Image from "../images/Image";

import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Buttons.module.css";

import { useCurrUser } from "../../contexts/CurrUserContext";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import { useAccountData, useSetAccountData } from "../../contexts/AccountDataContext";
import Profile from "../../components/Profile";
import { Button, Card, Media } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreImages } from "../../utilities/utilities";
import { AccountEditDropdown } from "../../components/Edit";

function AccountPage() {
  const [loaded, setLoaded] = useState(false);
  const currUser = useCurrUser();
  const {id} = useParams();
  const {setAccountData, handleFollow, handleUnFollow} = useSetAccountData();
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
                axiosReq.get(`/images/?owner__account=${id}`),
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
    <Card rounded>
      <Card.Body>
      <Media className="align-items-center justify-content-between">
            <Container>
                <Row>
                    <Col>
                      <Media>
                          <Profile src={currUser?.account_image} height={200}/>
                      </Media>
                    </Col>
                    <Col l={8}>  
                      <h3 className="m-2">{account?.owner}</h3>
                      <hr />
                      <p>Imges: <span>{account?.images_count}</span></p>
                      <p>Followers: <span>{account?.followers_count}</span></p>
                      <p>Following: <span>{account?.following_count}</span></p>

                    </Col>
                    <Col l={2}>
                        <div className="me-3">
                        {account?.is_owner && <AccountEditDropdown id={account?.id} />}
                        </div>
                        <br></br>
                        <br></br>
                        <br></br>
                            <Col lg={3} className="text-lg-right">
                            {currUser && !is_owner && 
                            (account?.following_id ? (
                              <Button className={btnStyles.SmallButton}
                              onClick={() => handleUnFollow(account)}>Unfollow</Button>
                            ) : (
                              <Button className={btnStyles.SmallButton}
                              onClick={() => handleFollow(account)}>Follow</Button>)
                              )}
                            </Col>
                        <br></br>
                        <p>Curent weight: <span>{account?.current_weight}</span></p>
                        <p>Goal weight: <span>{account?.goal_weight}</span></p>
                    </Col>     
                </Row>
                <hr />
                <Row>
                  <Col className="p-3">
                      <p>About: <span>{account?.content}</span></p>
                  </Col>
                </Row>
            </Container>
            </Media>
      </Card.Body>
    </Card>
    </>
  );

  const mainAccountImages = (
    <>
      <hr />
        <Container>
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
                  <p>This user hasn't posted images yet..</p>
              </Container>
            )}
        </Container>
      <hr />
    </>
  );

  return (
    <Row className="justify-content-lg-center">
      <Col lg={8}>
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