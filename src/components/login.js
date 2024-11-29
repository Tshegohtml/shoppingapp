// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './png.webp';
import './login.css'; // Add your CSS for styling

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    console.log("Entered Email:", email);
    console.log("Entered Password:", password);

    const users = JSON.parse(localStorage.getItem('users')) || []; // Retrieve all users

    // Find user with matching email and password
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
      localStorage.setItem('loggedIn', true); // Mark user as logged in
      navigate('/shoppinForm'); // Navigate to the shopping form
    } else {
      alert('Invalid email or password'); // Notify user of failure
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <img src={logo} className="img-logo" alt="Logo" />
        <h1>Login</h1>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="login-form__input-group">
            <label className="login-form__label">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="login-form__input"
            />
          </div>
          <div className="login-form__input-group">
            <label className="login-form__label">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-form__input"
            />
          </div>
          <button type="submit" className="login-form__button">Login</button>
          <p>
            Don't have an account? <a href="/register">Register here</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
