// NewPostForm.jsx
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_POST } from '../../utils/mutations'; 
import { GET_NEIGHBOURHOOD_POSTS } from '../../utils/queries'; 

const NewPostForm = () => {
  const [postContent, setPostContent] = useState('');
  const [addPost, { error }] = useMutation(ADD_POST, {
    refetchQueries: [{ query: GET_NEIGHBOURHOOD_POSTS }],
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await addPost({ variables: { content: postContent } });
      setPostContent('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <textarea
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
        placeholder="Write your new post here..."
      ></textarea>
      <button type="submit">Submit</button>
      {error && <p>Error: {error.message}</p>}
    </form>
  );
};

export default NewPostForm;
