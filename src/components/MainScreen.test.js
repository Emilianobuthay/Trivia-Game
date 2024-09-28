// src/store/triviaSlice.test.js
import { configureStore } from '@reduxjs/toolkit';
import triviaReducer, { resetGame } from './triviaSlice'; // Ajusta la ruta según tu estructura

describe('trivia reducer', () => {
  let store;

  beforeEach(() => {
    store = configureStore({ reducer: { trivia: triviaReducer } });
  });

  it('should handle resetGame', () => {
    // Estado modificado antes de llamar a resetGame
    const modifiedState = {
      difficulty: 'hard',
      category: '9',
      questions: ['Question 1', 'Question 2'],
      score: 5,
      attempts: 2,
      play: true,
    };

    // Aplicar el estado modificado al store
    store.dispatch({ type: 'trivia/setDifficulty', payload: modifiedState.difficulty });
    store.dispatch({ type: 'trivia/setCategory', payload: modifiedState.category });
    store.dispatch({ type: 'trivia/setQuestions', payload: modifiedState.questions });
    store.dispatch({ type: 'trivia/addScore', payload: modifiedState.score });
    store.dispatch({ type: 'trivia/addAttempts', payload: modifiedState.attempts - 1 });
    store.dispatch({ type: 'trivia/setPlay', payload: modifiedState.play });

    // Llamar a resetGame
    store.dispatch(resetGame());

    // Verificar que el nuevo estado sea el esperado
    const newState = store.getState().trivia;
    expect(newState).toEqual({
      difficulty: 'hard', // Mantiene la categoría y dificultad
      category: '9',
      questions: [], // Reinicia las preguntas
      score: 0, // Reinicia el puntaje
      attempts: 3, // Aumenta el número de intentos
      play: true, // Asegúrate de que el juego siga activo
    });
  });
});
