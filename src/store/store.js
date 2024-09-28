// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import triviaSlice from '../Redux/triviaSlice';

const store = configureStore({
  reducer: {
    trivia: triviaSlice,
  },
});

export default store;