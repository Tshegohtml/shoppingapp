import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './png.webp';  

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    console.log("Entered Username:", username);
    console.log("Entered Password:", password);

    const storedPassword = localStorage.getItem("password");

    console.log("Stored Password:", storedPassword);

    if (storedPassword && storedPassword === password) {
      localStorage.setItem('loggedIn', true);
      navigate('/shoppinForm'); 
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
       <img src={logo} className="img-logo" />
      <form className="login-form" onSubmit={handleLogin}>
        <h1>Login</h1>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        <p>
          Don't have an account? <a href="/register">Register here</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
