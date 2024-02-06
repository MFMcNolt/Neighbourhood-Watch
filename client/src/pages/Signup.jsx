import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    suburb: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [addUser] = useMutation(ADD_USER);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.username || !formData.email || !formData.password || !formData.suburb) {
      setErrorMessage('All fields are required');
      return;
    }

    try {
      const mutationResponse = await addUser({
        variables: {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          suburb: formData.suburb,
        },
      });

      if (mutationResponse.data && mutationResponse.data.addUser && mutationResponse.data.addUser.token) {
        // Show success message
        setSuccessMessage('Signed up successfully! Redirecting to profile page...');
        
        // Redirect to the profile page after a short delay
        setTimeout(() => {
          navigate('/me');
        }, 2000); // 2000 milliseconds (2 seconds) delay
      } else {
        setErrorMessage('Sign-up failed. Please try again.');
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <input
          type="text"
          name="suburb"
          placeholder="Suburb"
          value={formData.suburb}
          onChange={handleChange}
        />
        {errorMessage && <p>{errorMessage}</p>}
        {successMessage && <p>{successMessage}</p>}
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default SignUpPage;
