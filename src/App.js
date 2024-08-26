import React from 'react';
import { Provider } from 'react-redux';
import store from './components/store';
import ShoppingList from './components/shoppingList';
import ShoppingForm from './components/shoppinForm';
import ListSelector from './ListSelector';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Shopping List</h1>
        <ListSelector />
        <ShoppingForm />
        <ShoppingList />
      </div>
    </Provider>
  );
}

export default App;
