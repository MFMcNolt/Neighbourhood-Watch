import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_POSTS } from '../utils/queries';
import PostFilter from '../components/PostFilter';
import PostList from '../components/PostList';
import PostForm from '../components/PostForm';

const Home = () => {
  const [filter, setFilter] = useState('All'); // State for filtering posts
  const { loading, error, data } = useQuery(QUERY_POSTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { posts } = data;

  // Filter posts by selected topic
  const filteredPosts = filter === 'All' ? posts : posts.filter(post => post.postTopic === filter);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">MyNeighbourhood</h1>
      
      {/* Post Filter */}
      <PostFilter onFilterChange={setFilter} />

      <div className="row">
        <div className="col-md-8">
          {/* Post List */}
          <PostList posts={filteredPosts} />
        </div>
        <div className="col-md-4">
          {/* Post Form */}
          <div className="card">
            <div className="card-body">
              <h5 className="card-title"></h5>
              <PostForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
