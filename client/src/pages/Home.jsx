import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_POSTS } from '../utils/queries';
import PostFilter from '../components/PostFilter';
import PostList from '../components/PostList';
import PostForm from '../components/PostForm';

const Home = () => {
  const [filter, setFilter] = useState(null); // State for filtering posts
  const { loading, error, data } = useQuery(QUERY_POSTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { posts } = data;

  // Filter posts by selected topic
  const filteredPosts = filter ? posts.filter(post => post.topic === filter) : posts;

  return (
    <div>
      <h1>Home Page</h1>
      
      {/* Post List */}
      <PostList posts={filteredPosts} />

      {/* Post Filter */}
      <PostFilter setFilter={setFilter} />

     {/* Post Form */}
     <p>Add New Post</p>
     <PostForm />

    </div>
  );
};

export default Home;
