import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './SignUp.css'; // Import the CSS file

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword(formData.password)) {
      alert('Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character, and be at least 7 characters long.');
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/signup', formData);
      alert('SignUp successful');
    } catch (error) {
      alert('Error in SignUp');
    }
  };

  return (
    <form className="signup-container" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
      <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
      <h3>Password Requirements:</h3>
      <ul>
        <li>At least 1 uppercase letter (A-Z)</li>
        <li>At least 1 lowercase letter (a-z)</li>
        <li>At least 1 number (0-9)</li>
        <li>At least 1 special character (e.g., @, $, !, %)</li>
        <li>Minimum length of 7 characters</li>
      </ul>
      <div className="forgot-password-link">
        <Link to="/forgot-password">Forgot Password</Link>
      </div>
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">SignUp</button>
      <div className="additional-links">
        <span>Already have an account?</span> 
        <Link to="/login">Login</Link>
      </div>
    </form>
  );
};

export default SignUp;
