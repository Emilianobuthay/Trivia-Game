
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  difficulty: '',
  nameCategory:'',
  category: '',
  questions: [],
  score: 0,
  attempts: 1,
  play: false
};

const triviaSlice = createSlice({
  name: 'trivia',
  initialState,
  reducers: {
    setPlay: (state, action) => {
      state.play = action.payload;
    },
    setDifficulty: (state, action) => {
      state.difficulty = action.payload;
    },
    setNameCategory: (state, action) => {
      state.nameCategory = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    addScore: (state, action) => {
      state.score += action.payload;
    },
    addAttempts: (state, action) => {
        state.attempts += action.payload;
      },
    resetGame: (state) => {
      state.questions = [];
      state.score = 0;
    },
    exitGame: () => initialState,
  },
});

export const { setPlay, setDifficulty, setNameCategory, setCategory, setQuestions, addScore, addAttempts, resetGame, exitGame } = triviaSlice.actions;
export default triviaSlice.reducer;
