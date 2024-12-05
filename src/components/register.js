import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import './register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.find(user => user.username === username)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Username already exists!',
      });
    } else if (users.find(user => user.email === email)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Email is already registered!',
      });
    } else if (!/^\d{10}$/.test(phone)) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Phone Number',
        text: 'Please enter a valid 10-digit phone number.',
      });
    } else {
      const newUser = { username, password, email, phone };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        text: 'You have been registered successfully.',
        confirmButtonText: 'Proceed',
      }).then(() => {
        navigate('/shoppingForm');
      });
    }
  };

  return (
    <div className="register-container-forms">
      <div className="registerform-container">
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
        <div style={{ textAlign: 'center', marginTop: '15px' }}>
          <p>
            Already have an account?{' '}
            <span
              style={{
                color: '#007BFF',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
              onClick={() => navigate('/login')}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
