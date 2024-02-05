import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations'; // Adjust the path as needed

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    neighborhood: ''
  });

  const [addUser] = useMutation(ADD_USER);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.username || !formData.email || !formData.password || !formData.neighborhood) {
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
      // If successful, redirect to login page
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
          placeholder="Subrub"
          value={formData.suburb}
          onChange={handleChange}
        />
        {errorMessage && <p>{errorMessage}</p>}
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default SignUpPage;