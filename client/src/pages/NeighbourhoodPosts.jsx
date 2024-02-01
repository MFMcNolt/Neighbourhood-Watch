import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_NEIGHBOURHOOD_POSTS } from '../../queries'; // Import your query for fetching neighbourhood posts

const MyNeighbourhoodPage = () => {
  const [sortBy, setSortBy] = useState('createdAt'); // State for sorting options
  const { loading, error, data } = useQuery(GET_NEIGHBOURHOOD_POSTS, {
    variables: { sortBy }, // Pass sorting option to query
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const { neighbourhoodPosts } = data; // Assuming the query result has a property named neighbourhoodPosts

  return (
    <div>
      <h2>My Neighbourhood</h2>
      {/* Create a new post */}
      <Link to="/new-post">Create New Post</Link>

      {/* Sorting options */}
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="createdAt">Sort by Date</option>
        <option value="topic">Sort by Topic</option>
      </select>

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



