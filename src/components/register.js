// Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './png.webp'; // Ensure the path to your logo is correct
import './register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    const users = JSON.parse(localStorage.getItem('users')) || []; // Retrieve existing users

    // Validate inputs
    if (users.find(user => user.username === username)) {
      alert('Username Exists');
    } else if (users.find(user => user.email === email)) {
      alert('Email Already Registered');
    } else if (!/^\d{10}$/.test(phone)) {
      alert('Enter a Valid 10-digit Phone Number');
    } else {
      const newUser = { username, password, email, phone }; // Create new user object
      users.push(newUser); // Add new user to the array
      localStorage.setItem('users', JSON.stringify(users)); // Save all users
      alert('Registration Successful!'); // Notify user
      navigate('/login'); // Navigate to login after registration
    }
  };

  return (
    <div className="register-container-forms">
      <div className="registerform-container">
        <img src={logo} className="logo" alt="Logo" />
        <h1>Register</h1>
        <form onSubmit={(e) => { e.preventDefault(); handleRegister(); }} className="register-form">
          <div className="register-form__input-group">
            <label htmlFor="username" className="register-form__label">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="register-form__input"
            />
          </div>
          <div className="register-form__input-group">
            <label htmlFor="password" className="register-form__label">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="register-form__input"
            />
          </div>
          <div className="register-form__input-group">
            <label htmlFor="email" className="register-form__label">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="register-form__input"
            />
          </div>
          <div className="register-form__input-group">
            <label htmlFor="cellnumber" className="register-form__label">Cell Number:</label>
            <input
              type="tel"
              id="cellnumber"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              maxLength={10}
              className="register-form__input"
            />
          </div>
          <button type="submit" className="register-form__button">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
