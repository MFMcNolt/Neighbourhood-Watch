import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_SINGLE_POST } from '../utils/queries';
import { ADD_COMMENT } from '../utils/mutations';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';

const SinglePostPage = () => {
  const { postId } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_POST, { variables: { postId } });
  const [commentText, setCommentText] = useState('');

  const [addComment] = useMutation(ADD_COMMENT, {
    refetchQueries: [{ query: QUERY_SINGLE_POST, variables: { postId } }]
  });

  const handleSubmitComment = async () => {
    if (!commentText) {
      return;
    }

    try {
      // Perform add comment mutation
      await addComment({ variables: { postId, commentText } });
      // Clear comment text
      setCommentText('');
    } catch (error) {
      // Handle error (e.g., display error message)
    }
  };

  if (loading) return <p>Loading...</p>;
  const { post } = data;

  return (
    <div>
      <h2>{post.postTitle}</h2>
      <p>Author: {post.postAuthor}</p>
      <p>Created At: {post.createdAt}</p>
      <p>Text: {post.postText}</p>

      <h3>Comments</h3>
      {/* Render the CommentList component */}
      <CommentList comments={post.comments} />

      {/* Render the CommentForm component */}
      <CommentForm postId={postId} />

      <button onClick={handleSubmitComment}>Submit Comment</button>
    </div>
  );
};
export default SinglePostPage;