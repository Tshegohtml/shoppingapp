import React, { useState, } from 'react';
import './register.css'
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('./login.js');
  
   

    const users = JSON.parse(localStorage.getItem('users')) || [];
    console.log('Users:', users);

    if (users.find(user => user.username === username)) {
      alert('Username Exists');
    } else if (users.find(user => user.email === email)) {
      alert('Email Already Registered');
    } else if (!/^\d{10}$/.test(phone)) {
      alert('Enter a Valid 10-digit Phone Number');
    } else {
      const newUser = { username, password, email, phone };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      alert('Registration Successful!');
     
    }
   navigate('/login')
  };
  return (
    <div className="App">
      <div className='logo'></div>
      <h1>Register</h1>
      <form>
        <div>
          <label htmlFor="username">Username:</label>
          <input className='user'
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="cellnumber">Cell Number:</label>
          <input
            type="tel"
            id="cellnumber"
            value={phone} onChange={(e) => setPhone(e.target.value)} 
            required maxLength={10}
          />
        </div>
        <button type="button" onClick={handleRegister}>
          Register
        </button>
      </form>
    </div>
  );
};



export default Register;
