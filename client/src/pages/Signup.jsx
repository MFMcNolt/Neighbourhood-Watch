import { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
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

    // Check if the mutation response contains data
    if (mutationResponse.data && mutationResponse.data.addUser && mutationResponse.data.addUser.token) {
      
      // Redirect to the login page
      navigate('/login'); 
    } else {
      // Handle the case where the mutation response does not contain a token
      setErrorMessage('Sign-up failed. Please try again.');
    }
  } catch (error) {
    setErrorMessage(error.message);
  }
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
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};
}

export default SignUpPage;