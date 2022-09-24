import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

import Profile from "../../components/Profile";
import { axiosRes } from "../../api/axiosDefaults";
import btnStyles from "../../styles/Buttons.module.css";

function AddCommentForm(props) {
  const { image, setImage, setComments, accountImage, account_id } = props;
  const [text, setText] = useState("");

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/comments/", {
        text,
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
      setText("");
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
              placeholder="Type your comment here...."
              as="textarea"
              value={text}
              onChange={handleChange}
              rows={2}/>
        </InputGroup>
      </Form.Group>
      <button className={btnStyles.SmallButton}
      disabled={!text.trim()} type="submit">
        Post
      </button>
    </Form>
  );
}

export default AddCommentForm;