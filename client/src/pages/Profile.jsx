import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_POSTS, QUERY_ME } from '../utils/queries';
import { UPDATE_USER_PROFILE } from '../utils/mutations';

const ProfilePage = () => {
  // const [userData, setUserData] = useState(null);
  // const { loading: profileLoading, error: profileError, data: profileData } = useQuery(QUERY_USER);
  const { loading, error, data } = useQuery(QUERY_ME);
  const userData = data?.me
  // const { loading: postsLoading, error: postsError, data: postData } = useQuery(QUERY_POSTS);
  // const [updateProfile] = useMutation(UPDATE_USER_PROFILE);
console.log(data)

  // Effect to update user data when profileData changes
  // useEffect(() => {
  //   if (profileData) {
  //     setUserData(profileData.user);
  //   }
  // }, [profileData]);

  // update profile 
  const handleUpdateProfile = async (updatedData) => {
    try {
      await updateProfile({ variables: { updatedData } });
      
      // Update local state with the updated data immediately
      setUserData(updatedData);
      console.log('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error.message);
    }
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('id_token');
    history.push('/login');
  };

  // if (profileLoading || postsLoading) return <p>Loading...</p>;
  // if (profileError || postsError) return <p>Error :(</p>;

  return (
    <div>
      <h2>Profile</h2>
      {userData && (
        <>
          <div>
            <p>Username: {userData.username}</p>
            <p>Email: {userData.email}</p>
            <p>Suburb: {userData.suburb}</p>
          </div>
          <h3>MyNeighbourhood Posts</h3>
          <ul>
            {userData.posts.map(post => (
              <li key={post._id}>
                {post.postText}
              </li>
            ))}
          </ul>
          {/* <button onClick={() => handleUpdateProfile(updatedData)}>Edit Profile</button> */}
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </div>
  );
};

export default ProfilePage;



