import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; 

import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    console.log('Entered Email:', email);
    console.log('Entered Password:', password);

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      localStorage.setItem('loggedIn', true);

     
      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: 'Welcome back!',
        timer: 2000,
        showConfirmButton: false,
      });

      navigate('/shoppingform');
    } else {
 
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Invalid email or password. Please try again.',
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
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
          <button type="submit" className="login-form__button">
            Login
          </button>
          <div style={{ textAlign: 'center', marginTop: '15px' }}>
            <p>
              Don't have an account?{' '}
              <span
                style={{
                  color: '#007BFF',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
                onClick={() => navigate('/register')}
              >
                Sign up
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
