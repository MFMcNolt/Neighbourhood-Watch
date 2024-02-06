import React from 'react';

const CommentList = ({ comments }) => {
  return (
    <div>
      {comments.map(comment => (
        <div key={comment._id} className="comment">
          <p>Comment from {comment.commentAuthor}: {comment.commentText}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentList;

