import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_POSTS, ADD_POST } from '../utils/queries';
import PostFilter from '../components/PostFilter';
import PostList from '../components/PostList';
import PostForm from '../components/PostForm';

const Home = () => {
  const [filter, setFilter] = useState('All');
  const { loading, error, data } = useQuery(QUERY_POSTS);
  const [addPost] = useMutation(ADD_POST, {
    refetchQueries: [{ query: QUERY_POSTS }],
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { posts } = data;
  const filteredPosts = filter === 'All' ? posts : posts.filter(post => post.postTopic === filter);

  const handleSubmit = (postData) => {
    addPost({
      variables: {
        title: postData.title,
        topic: postData.topic,
        text: postData.text,
      },
    }).then(() => {
      console.log('Post submitted successfully!');
    }).catch((error) => {
      console.error('Error submitting post:', error);
    });
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">MyNeighbourhood</h1>
      <PostFilter onFilterChange={setFilter} />
      <div className="row">
        <div className="col-md-8">
          <PostList posts={filteredPosts} />
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Add A New Post</h5>
              <PostForm onSubmit={handleSubmit} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
