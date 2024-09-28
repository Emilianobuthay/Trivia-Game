// src/components/TriviaScreen.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import TriviaScreen from './TriviaScreen';
import { setQuestions } from '../store/triviaSlice';

test('shows feedback when selecting an answer', async () => {
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

  // Espera un poco para que el feedback se muestre
  await waitFor(() => {
    // Verifica que el botón para 'London' se vuelve rojo
    expect(screen.getByText('London')).toHaveStyle('background-color: rgb(244, 67, 54)'); // color de error
  });

  // Verifica que el botón para 'Paris' se vuelve verde
  await waitFor(() => {
    expect(screen.getByText('Paris')).toHaveStyle('background-color: rgb(76, 175, 80)'); // color de éxito
  });

  // Simula seleccionar la respuesta correcta
  fireEvent.click(screen.getByText('Paris'));

  // Espera un poco para que el feedback se muestre
  await waitFor(() => {
    // Verifica que el botón para 'Paris' se vuelve verde
    expect(screen.getByText('Paris')).toHaveStyle('background-color: rgb(76, 175, 80)'); // color de éxito
  });
});
