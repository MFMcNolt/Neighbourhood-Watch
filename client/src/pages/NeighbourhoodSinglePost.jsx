import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_POST_DETAILS, ADD_COMMENT } from '../utils/queries';

const PostDetailsPage = () => {
  const { postId } = useParams();
  const { loading, error, data } = useQuery(GET_POST_DETAILS, { variables: { postId } });

  const [commentText, setCommentText] = useState('');

  const [addComment] = useMutation(ADD_COMMENT, {
    refetchQueries: [{ query: GET_POST_DETAILS, variables: { postId } }]
  });

  const handleSubmitComment = async () => {
    // Perform form validation
    if (!commentText) {
      // Handle error (e.g., display error message)
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
  if (error) return <p>Error :(</p>;

  const { post } = data; // Assuming the query result has a property named post

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>Author: {post.author}</p>
      <p>Topic: {post.topic}</p>
      
      <h3>Comments</h3>
      <ul>
        {post.comments.map(comment => (
          <li key={comment.id}>
            <p>{comment.text}</p>
            <p>Author: {comment.author}</p>
          </li>
        ))}
      </ul>

      {/* Comment form */}
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Add a comment..."
      />
      <button onClick={handleSubmitComment}>Submit Comment</button>
    </div>
  );
};

export default PostDetailsPage;



