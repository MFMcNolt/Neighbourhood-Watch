import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_USER_PROFILE } from '../utils/mutations';

const UpdateUserProfile = ({ user }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    neighborhoodGroup: user.neighborhoodGroup
  });

  const [updateUserProfile, { error }] = useMutation(UPDATE_USER_PROFILE);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile({
        variables: {
          input: formData
        }
      });
      // Optionally, you can handle success like showing a success message or redirecting the user
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div>
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="neighborhoodGroup">Neighborhood Group:</label>
          <input type="text" id="neighborhoodGroup" name="neighborhoodGroup" value={formData.neighborhoodGroup} onChange={handleChange} />
        </div>
        <button type="submit">Update Profile</button>
      </form>
      {error && <p>Error updating profile: {error.message}</p>}
    </div>
  );
};

export default UpdateUserProfile;
