import React, { useState } from 'react';

const CommentForm = ({ onSubmit, user }) => {
  const [commentText, setCommentText] = useState('');
  const [name, setName] = useState(user ? user.name : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, text: commentText });
    setCommentText('');
    setName(user ? user.name : '');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'commentText') {
      setCommentText(value);
    } else if (name === 'name') {
      setName(value);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          name="name"
          className="form-control"
          value={name}
          onChange={handleChange}
          placeholder="Your Name"
        />
      </div>
      <div className="form-group">
        <textarea
          name="commentText"
          className="form-control"
          value={commentText}
          onChange={handleChange}
          placeholder="Add a comment..."
        />
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-primary">Submit Comment</button>
      </div>
    </form>
  );
};

export default CommentForm;
