import React, { useState } from 'react';
import axios from 'axios';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [username, setUsername] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/forgot-password', { username });
      alert('Password reset link sent');
    } catch (error) {
      alert('Error in sending reset link');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Forgot Password</h2>
      <input type="text" name="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required />
      <button type="submit">Send Reset Link</button>
    </form>
  );
};

export default ForgotPassword;
