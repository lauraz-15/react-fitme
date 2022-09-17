import React from "react";
import { Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import Profile from "../../components/Profile";

const Comment = (props) => {
  const { account_id, account_image, owner, updated_on, text } = props;

  return (
    <div>
      <hr />
      <Media>
        <Link to={`/accounts/${account_id}`}>
          <Profile src={account_image} />
        </Link>
        <Media.Body className="align-self-center ml-2">
          <span>{owner}</span>
          <span>{updated_on}</span>
          <p>{text}</p>
        </Media.Body>
      </Media>
    </div>
  );
};

export default Comment;