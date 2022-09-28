import React from "react";
import {
  Card,
  Col,
  Container,
  Media,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { axiosRes } from "../../api/axiosDefaults";
import { EditDropdown } from "../../components/Edit";
import Profile from "../../components/Profile";
import { useCurrUser } from "../../contexts/CurrUserContext";

import styles from "../../styles/Image.module.css";

/**
 * Display single Image
 */
const Image = (props) => {
  const {
    id,
    owner,
    account_id,
    account_image,
    comments_count,
    kudos_id,
    kudos_count,
    updated_on,
    description,
    picture,
    imagePage,
    setImages,
  } = props;

  const currUser = useCurrUser();
  const is_owner = currUser?.username === owner;
  const history = useHistory();

  /**
   * Direct the user to the Edit Image Page
   */
  const handleEdit = () => {
    history.push(`/images/${id}/edit`);
  };

  /**
   * Delete selected image from the API
   * Direct the user back to the previous page
   */
  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/images/${id}/`);
      history.goBack();
    } catch (err) {}
  };

  /**
   * Check if the kudos id exit in the API
   * If it doesn't exist increment kudos count by one
   * Add kudos ID to the API for selected image
   */
  const handleKudos = async () => {
    try {
      const { data } = await axiosRes.post("/kudos/", { image: id });
      setImages((prevImages) => ({
        ...prevImages,
        results: prevImages.results.map((image) => {
          return image.id === id  ? {
                ...image,
                kudos_count: image.kudos_count + 1,
                kudos_id: data.id,
              }
            : image;
        }),
      }));
    } catch (err) {}
  };

  /**
   * Decrement kudos count by one
   * Remove kudos ID to the API for selected image
   */
  const handleRemoveKudos = async () => {
    try {
      await axiosRes.delete(`/kudos/${kudos_id}`);
      setImages((prevImages) => ({
        ...prevImages,
        results: prevImages.results.map((image) => {
          return image.id === id ? { ...image, kudos_count: image.kudos_count - 1, kudos_id: null }
            : image;
        }),
      }));
    } catch (err) {}
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Container>
            <Row>
              <Col>
                <Link to={`/accounts/${account_id}`}>
                  <Profile src={account_image} height={60} />
                </Link>
              </Col>
              <Col xs={8}>
                <span className={styles.Owner}>{owner}</span>
                <br />
                {description}
              </Col>
              <Col>
                <div className="d-flex align-items-center">
                  {is_owner && imagePage && (
                    <EditDropdown
                      handleEdit={handleEdit}
                      handleDelete={handleDelete}
                    />
                  )}
                </div>
              </Col>
            </Row>
          </Container>
        </Media>
      </Card.Body>

      <Link to={`/images/${id}`}>
        <Card.Img src={picture} alt={description} className={styles.Image} />
      </Link>
      <Card.Body className="align-items-center justify-content-between">
        <Media className="align-items-center justify-content-between">
          <div>
            {is_owner ? (
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip>Users can't give kudos to their own image!</Tooltip>
                }
              >
                <i className="fa-regular fa-thumbs-up" />
              </OverlayTrigger>
            ) : kudos_id ? (
              <span onClick={handleRemoveKudos}>
                <i className="fa-solid fa-thumbs-up" />
              </span>
            ) : currUser ? (
              <span onClick={handleKudos}>
                <i className="fa-regular fa-thumbs-up" />
              </span>
            ) : (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Log in to give kudos!</Tooltip>}
              >
                <i className="fa-regular fa-thumbs-up" />
              </OverlayTrigger>
            )}
            {kudos_count}
            <Link to={`/images/${id}`} aria-label="Add comment link">
              <i className="fa-regular fa-comment" />
            </Link>
            {comments_count}
          </div>
          <div className="d-flex align-items-center">{updated_on}</div>
        </Media>
      </Card.Body>
    </Card>
  );
};

export default Image;
