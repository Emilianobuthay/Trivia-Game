// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import triviaReducer from '../Redux/triviaSlice';

const store = configureStore({
  reducer: {
    trivia: triviaReducer,
  },
});

export default store;