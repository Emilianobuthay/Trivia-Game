// src/components/TriviaScreen.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import TriviaScreen from './TriviaScreen';
import { setQuestions } from '../store/triviaSlice';

test('shows feedback when selecting an answer', () => {
  const mockQuestions = [
    {
      question: 'What is the capital of France?',
      correct_answer: 'Paris',
      incorrect_answers: ['London', 'Berlin', 'Madrid'],
    },
  ];

  store.dispatch(setQuestions(mockQuestions));

  render(
    <Provider store={store}>
      <TriviaScreen />
    </Provider>
  );

  // Verifica que la pregunta es mostrada
  expect(screen.getByText('What is the capital of France?')).toBeInTheDocument();

  // Simula seleccionar una respuesta incorrecta
  fireEvent.click(screen.getByText('London'));
  expect(screen.getByText('Incorrect!')).toBeInTheDocument();

  // Simula seleccionar la respuesta correcta
  fireEvent.click(screen.getByText('Paris'));
  expect(screen.getByText('Correct!')).toBeInTheDocument();
});
