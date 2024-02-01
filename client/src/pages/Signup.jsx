import { useState } from 'react';
import { Link } from 'react-router-dom';

const SignUpPage = () => {
  // State for form inputs
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    neighborhood: ''
  });

  // State for error message
  const [errorMessage, setErrorMessage] = useState('');

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Perform form validation
    if (!formData.username || !formData.email || !formData.password || !formData.neighborhood) {
      setErrorMessage('All fields are required');
      return;
    }

    try {
      // Perform sign-up logic (e.g., call sign-up API)
      // If successful, redirect to login page
    } catch (error) {
      // Handle sign-up error (e.g., display error message)
      setErrorMessage(error.message);
    }
  };

  // Function to handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        {/* Username input */}
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        {/* Email input */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        {/* Password input */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        {/* Neighborhood input */}
        <input
          type="text"
          name="neighborhood"
          placeholder="Neighborhood"
          value={formData.neighborhood}
          onChange={handleChange}
        />
        {/* Error message display */}
        {errorMessage && <p>{errorMessage}</p>}
        {/* Sign Up button */}
        <button type="submit">Sign Up</button>
      </form>
      {/* Link to navigate to the login page */}
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default SignUpPage;


