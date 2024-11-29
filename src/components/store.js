// store.js
import { configureStore } from '@reduxjs/toolkit';
import shoppingReducer from './actions'; 

const store = configureStore({
  reducer: {
    shopping: shoppingReducer
  }
});

export default store;
