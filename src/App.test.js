import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App'; // Asegúrate de que la ruta sea correcta
import MainScreen from './MainScreen';
import TriviaScreen from './TriviaScreen';
import ResultsScreen from './ResultsScreen';

describe('App', () => {
  test('renders MainScreen on the root path', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    // Aquí debes agregar tus afirmaciones para verificar que MainScreen se renderiza
  });

  test('renders TriviaScreen when navigating to /trivia', () => {
    render(
      <MemoryRouter initialEntries={['/trivia']}>
        <App />
      </MemoryRouter>
    );
    // Aquí debes agregar tus afirmaciones para verificar que TriviaScreen se renderiza
  });

  test('renders ResultsScreen when navigating to /result', () => {
    render(
      <MemoryRouter initialEntries={['/result']}>
        <App />
      </MemoryRouter>
    );
    // Aquí debes agregar tus afirmaciones para verificar que ResultsScreen se renderiza
  });
});
