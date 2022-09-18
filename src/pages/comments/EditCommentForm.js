import React, { useState } from "react";
import { axiosRes } from "../../api/axiosDefaults";
import Form from "react-bootstrap/Form";




function EditCommentForm(props) {
  const { id, text, setEditForm, setComments } = props;

  const [content, setContent] = useState(text);

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put(`/comments/${id}/`, {
        text: content.trim(),
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) => {
          return comment.id === id
            ? {
                ...comment,
                text: content.trim(),
                updated_on: "now",
              }
            : comment;
        }),
      }));
      setEditForm(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="pr-1">
        <Form.Control as="textarea"
          value={content} onChange={handleChange} rows={2}/>
      </Form.Group>
      <div className="text-right">
        <button onClick={() => setEditForm(false)} type="buttonn">
          cancel
        </button>
        <button disabled={!text.trim()} type="submit">
          update
        </button>
      </div>
    </Form>
  );
}

export default EditCommentForm;