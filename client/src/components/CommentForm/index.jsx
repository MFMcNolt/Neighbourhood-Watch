import React, { useState } from 'react';

const CommentForm = ({ onSubmit }) => {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(commentText);
    setCommentText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Add a comment..."
      />
    </form>
  );
};

export default CommentForm;
