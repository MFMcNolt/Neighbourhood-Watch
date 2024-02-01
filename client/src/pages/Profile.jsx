// need to replace GET_USER_PROFILE, GET_USER_POSTS, and UPDATE_PROFILE_MUTATION with your actual GraphQL queries and mutation. 
// need to adjust the data structure according to your GraphQL schema.


import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USER_PROFILE, GET_USER_POSTS } from '../../queries'; // Import your queries

const ProfilePage = () => {
  // State to store user profile data
  const [userData, setUserData] = useState(null);

  // Query to fetch user profile data
  const { loading: profileLoading, error: profileError, data: profileData } = useQuery(GET_USER_PROFILE);

  // Query to fetch user's posts
  const { loading: postsLoading, error: postsError, data: postData } = useQuery(GET_USER_POSTS);

  // Mutation to handle profile updates
  const [updateProfile] = useMutation(UPDATE_PROFILE_MUTATION);

  // Effect to update user data when profileData changes
  useEffect(() => {
    if (profileData) {
      setUserData(profileData.user);
    }
  }, [profileData]);

  // Function to handle profile update
  const handleProfileUpdate = (updatedData) => {
    // Call the mutation to update profile with updatedData
    updateProfile({ variables: { updatedData } });
    // You may also want to update local state with the updatedData immediately
  };

  // Function to handle logout
  const handleLogout = () => {
    // Implement logout logic here (e.g., clearing user session, redirecting to login page)
  };

  if (profileLoading || postsLoading) return <p>Loading...</p>;
  if (profileError || postsError) return <p>Error :(</p>;

  return (
    <div>
      <h2>Profile</h2>
      {userData && (
        <>
          <div>
            <p>Username: {userData.username}</p>
            <p>Email: {userData.email}</p>
            <p>
              MyNeighbourhood: 
              <Link to="/neighbourhood">{userData.neighbourhood}</Link>
            </p>
          </div>
          <h3>My Posts</h3>
          <ul>
            {postData.posts.map(post => (
              <li key={post._id}>
                {post.postText}
              </li>
            ))}
          </ul>
          <button onClick={() => handleProfileUpdate(updatedData)}>Edit Profile</button>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </div>
  );
};

export default ProfilePage;



