import React from 'react';
import { Link } from 'react-router-dom';

const PostList = ({ posts }) => {
  return (
    <div>
      <h2>Posts</h2>
      {posts.map(post => (
        <div key={post._id} className="post">
          <h3>{post.postTitle}</h3>
          <p>Topic: {post.topic}</p>
          <p>{post.postText}</p>
          <p>Author: {post.postAuthor}</p>
          <p>Created At: {post.createdAt}</p>
          <Link to={`/posts/${post._id}`}>View Post</Link>
        </div>
      ))}
    </div>
  );
};

export default PostList;
