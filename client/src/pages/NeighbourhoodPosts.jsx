import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_POSTS } from '../utils/queries'; 
import PostFilter from '../components/PostFilter'; 

const neighbourhoodPosts = () => {
  const [sortBy, setSortBy] = useState('createdAt'); 
  const [activeFilter, setActiveFilter] = useState('All');
  const { loading, error, data } = useQuery(QUERY_POSTS, {
    variables: { sortBy, filter: activeFilter },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const { neighbourhoodPosts } = data; // Assuming the query result has a property named neighbourhoodPosts

  // Function to handle filter change
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  return (
    <div>
      <h2>My Neighbourhood</h2>
      {/* New post form */}
      <PostForm />

      {/* Filtering options */}
      <PostFilter onFilterChange={handleFilterChange} />

      {/* List of posts */}
      <ul>
        {neighbourhoodPosts.map(post => (
          <li key={post.id}>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
            <p>{post.text}</p>
            <p>Topic: {post.topic}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default neighbourhoodPosts;
