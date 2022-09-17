import React from 'react'

const Comment = (props) => {
  return (
    <div>
        {
        comments.results.map(comment => (
        <p key={comment.id}>{comment.owner}: {comment.text}</p>
        ))
        }
    </div>
  )
}

export default Comment