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

  const [addComment] = useMutation(ADD_COMMENT, {
    refetchQueries: [{ query: QUERY_SINGLE_POST, variables: { postId } }]
  });

  const [comments, setComments] = useState([]);

  const handleSubmitComment = async (comment) => {
    if (!comment.text || !comment.name) {
      return;
    }

    try {
      const { data } = await addComment({ variables: { postId, ...comment } });
      // Update comments state with the new comment
      setComments([...comments, data.addComment]);
    } catch (error) {
      console.error('Error adding comment:', error);
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
      <CommentList comments={comments} />

      {/* Pass handleSubmitComment function as prop to CommentForm */}
      <CommentForm onSubmit={handleSubmitComment} />

    </div>
  );
};

export default SinglePostPage;
