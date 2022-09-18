import React, { useState } from "react";
import { Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import { EditDropdown } from "../../components/Edit";
import Profile from "../../components/Profile";
import { useCurrUser } from '../../contexts/CurrUserContext'
import EditCommentForm from "./EditCommentForm";



const Comment = (props) => {
  const { account_id, account_image, owner, updated_on, text,
  setImage, setComments, id } = props;
  
  const [editForm, setEditForm] = useState(false);

  const currUser = useCurrUser();
  const is_owner = currUser?.username === owner

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/comments/${id}/`)
      setImage(prevImage => ({
        results: [{
          ...prevImage.results[0],
          comments_count: prevImage.results[0].comments_count -1
        }]
      }));

      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.filter((comment) => comment.id !== id),
      }))
    } catch(err) {

    }
   }

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
          {editForm ? (
          <EditCommentForm id={id} account_id={account_id} text={text} 
          accountImage={account_image} setComments={setComments} 
          setEditForm={setEditForm}/>
          ) : (<p>{text}</p>)}
        </Media.Body>
        {is_owner && !editForm && (
          <EditDropdown
            handleEdit={() => setEditForm(true)}
            handleDelete={handleDelete}/>
        )}
      </Media>
    </div>
  );
};

export default Comment;