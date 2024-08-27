import React from 'react';
import { Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './components/store';
import ShoppingList from './components/shoppingList';
import ShoppingForm from './components/shoppinForm';
import Register from './components/register';
import LoginForm from './components/login';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App"></div>
      {/* <ShoppingForm/> */}
      <Register/>
    </Provider>
  );
}

export default App;
