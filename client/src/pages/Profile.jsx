import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { UPDATE_USER_PROFILE } from '../utils/mutations';

const ProfilePage = () => {
  const { loading, error, data } = useQuery(QUERY_ME);
  const userData = data?.me;
  const [updateProfile] = useMutation(UPDATE_USER_PROFILE);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState({});

  useEffect(() => {
    if (userData) {
      setUpdatedData({
        username: userData.username,
        email: userData.email,
        suburb: userData.suburb
      });
    }
  }, [userData]);

  const handleUpdateProfile = async () => {
    try {
      await updateProfile({ variables: { updatedData } });
      console.log('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('id_token');
    // Redirect to the login page after logout
    window.location.href = '/login';
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Profile</h2>
      {userData && (
        <>
          <div className="mb-4">
            <p><strong>Username:</strong> {userData.username}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Suburb:</strong> {userData.suburb}</p>
          </div>
          <h3 className="mb-3">MyNeighbourhood Posts</h3>
          <ul className="list-group mb-4">
            {userData.posts.map(post => (
              <li key={post._id} className="list-group-item">{post.postText}</li>
            ))}
          </ul>
          {isEditing ? (
            <>
              <div className="mb-3">
                <input
                  type="text"
                  value={updatedData.username}
                  onChange={e => setUpdatedData({ ...updatedData, username: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  value={updatedData.email}
                  onChange={e => setUpdatedData({ ...updatedData, email: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={updatedData.suburb}
                  onChange={e => setUpdatedData({ ...updatedData, suburb: e.target.value })}
                />
              </div>
              <button className="btn btn-primary mr-3" onClick={handleUpdateProfile}>Save</button>
              <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
            </>
          ) : (
            <button className="btn btn-primary mb-3" onClick={() => setIsEditing(true)}>Edit Profile</button>
          )}
          <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
