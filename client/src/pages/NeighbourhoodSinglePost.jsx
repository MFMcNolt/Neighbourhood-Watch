import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_SINGLE_POST } from '../utils/queries';
import { ADD_COMMENT } from '../utils/mutations';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';

const PostDetailsPage = () => {
  const { postId } = useParams();
  const { loading, error, data } = useQuery(QUERY_SINGLE_POST, { variables: { postId } });

  const [commentText, setCommentText] = useState('');

  const [addComment] = useMutation(ADD_COMMENT, {
    refetchQueries: [{ query: QUERY_SINGLE_POST, variables: { postId } }]
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

  const { post } = data; 

  return (
    <div>
      <h2>{post.title}</h2>
      <p>Author: {post.author}</p>
      <p>Topic: {post.topic}</p>
      <p>{post.text}</p>
      
      <h3>Comments</h3>
      <ul>
        {post.comments.map(comment => (
          <li key={comment.id}>
            <p>{comment.text}</p>
            <p>Author: {comment.author}</p>
          </li>
        ))}
      </ul>

      {/* Render the CommentList component */}
      <CommentList comments={post.comments} />

      {/* Render the CommentForm component */}
      <CommentForm comments={post.comments} />

      {/* Comment form
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Add a comment..."
      /> */}

      <button onClick={handleSubmitComment}>Submit Comment</button>
    </div>
  );
};

export default PostDetailsPage;



