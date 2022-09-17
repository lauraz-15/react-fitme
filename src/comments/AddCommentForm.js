import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { axiosRes } from "../../api/axiosDefaults";
import Profile from "../components/Profile";

function AddCommentForm(props) {
  const { image, setImage, setComments, accountImage, account_id } = props;
  const [info, setInfo] = useState("");

  const handleChange = (event) => {
    setInfo(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/comments/", {
        info,
        image,
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));
      setImage((prevImage) => ({
        results: [
          {
            ...prevImage.results[0],
            comments_count: prevImage.results[0].comments_count + 1,
          },
        ],
      }));
      setInfo("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup>
          <Link to={`/accounts/${account_id}`}>
            <Profile src={accountImage} />
          </Link>
          <Form.Control
            className={styles.Form}
            placeholder="Type your comment here...."
            as="textarea"
            value={content}
            onChange={handleChange}
            rows={2}
          />
        </InputGroup>
      </Form.Group>
      <button
        className={`${styles.Button} btn d-block ml-auto`}
        disabled={!content.trim()}
        type="submit"
      >
        Publish
      </button>
    </Form>
  );
}

export default AddCommentForm;