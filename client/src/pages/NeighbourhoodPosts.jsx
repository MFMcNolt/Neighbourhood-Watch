import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_NEIGHBOURHOOD_POSTS } from '../../queries'; // Import your query for fetching neighbourhood posts
import MyNeighbourhoodFilter from '../components/MyNeighbourhoodFilter'; // Import your filter component

const MyNeighbourhoodPage = () => {
  const [sortBy, setSortBy] = useState('createdAt'); // State for sorting options
  const [activeFilter, setActiveFilter] = useState('All'); // State for active filter
  const { loading, error, data } = useQuery(GET_NEIGHBOURHOOD_POSTS, {
    variables: { sortBy, filter: activeFilter }, // Pass sorting option and filter to query
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
      <MyNeighbourhoodFilter onFilterChange={handleFilterChange} />

      {/* List of posts */}
      <ul>
        {neighbourhoodPosts.map(post => (
          <li key={post.id}>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
            <p>{post.content}</p>
            <p>Topic: {post.topic}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyNeighbourhoodPage;
