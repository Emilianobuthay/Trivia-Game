// src/store/triviaSlice.test.js
import triviaReducer, {
    setDifficulty,
    setCategory,
    setQuestions,
    addScore,
    resetGame,
  } from './triviaSlice';
  
  describe('trivia reducer', () => {
    const initialState = {
      difficulty: 'easy',
      category: '',
      questions: [],
      score: 0,
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
  
    it('should handle resetGame', () => {
      const modifiedState = {
        difficulty: 'hard',
        category: '9',
        questions: [{ question: 'Sample?' }],
        score: 60,
      };
      const newState = triviaReducer(modifiedState, resetGame());
      expect(newState).toEqual(initialState);
    });
  });
  