// src/store/triviaSlice.test.js
import triviaReducer, {
  setDifficulty,
  setCategory,
  setQuestions,
  addScore,
  addAttempts,
  resetGame,
  exitGame,
} from './triviaSlice';

describe('trivia reducer', () => {
  const initialState = {
    difficulty: '',
    category: '',
    questions: [],
    score: 0,
    attempts: 1,
    play: false,
  };

  it('should handle setDifficulty', () => {
    const newState = triviaReducer(initialState, setDifficulty('hard'));
    expect(newState.difficulty).toEqual('hard');
  });

  it('should handle setCategory', () => {
    const newState = triviaReducer(initialState, setCategory('9'));
    expect(newState.category).toEqual('9');
  });

  it('should handle setQuestions', () => {
    const sampleQuestions = [{ question: 'Sample?' }];
    const newState = triviaReducer(initialState, setQuestions(sampleQuestions));
    expect(newState.questions).toEqual(sampleQuestions);
  });

  it('should handle addScore', () => {
    const newState = triviaReducer(initialState, addScore(20));
    expect(newState.score).toEqual(20);
  });

  it('should handle addAttempts', () => {
    const newState = triviaReducer(initialState, addAttempts(2));
    expect(newState.attempts).toEqual(3); // Inicialmente 1, sumamos 2
  });

  it('should handle resetGame', () => {
    const modifiedState = {
      difficulty: 'hard',
      category: '9',
      questions: [{ question: 'Sample?' }],
      score: 60,
      attempts: 3,
      play: true,
    };
    const newState = triviaReducer(modifiedState, resetGame());
    expect(newState).toEqual({
      ...initialState,
      attempts: 1, // Aseguramos que attempts se reinicie a 1
    });
  });

  it('should handle exitGame', () => {
    const modifiedState = {
      difficulty: 'hard',
      category: '9',
      questions: [{ question: 'Sample?' }],
      score: 60,
      attempts: 3,
      play: true,
    };
    const newState = triviaReducer(modifiedState, exitGame());
    expect(newState).toEqual(initialState);
  });
});
