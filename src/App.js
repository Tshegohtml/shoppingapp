import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './components/store';
import ShoppingList from './components/shoppingList';
import ShoppingForm from './components/shoppinForm'; 
import Register from './components/register';
import Login from './components/login'; 
import './App.css';
import './components/login.css'; 



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
       <Route path="/login"  element={<Login />} />
        <Route path="/shoppinForm" element={<ShoppingForm />} />
        <Route path="/shoppingList" element={<ShoppingList />} /> 
      </Routes>
    </Router>
  );
};

export default App;
