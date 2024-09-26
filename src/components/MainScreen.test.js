// src/components/MainScreen.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import MainScreen from './MainScreen';

test('renders MainScreen and allows game start', () => {
  const onStartGame = jest.fn();

  render(
    <Provider store={store}>
      <MainScreen onStartGame={onStartGame} />
    </Provider>
  );

  // Verifica que el botón de jugar está deshabilitado inicialmente
  const playButton = screen.getByText('Jugar!');
  expect(playButton).toBeDisabled();

  // Simula seleccionar una categoría
  fireEvent.change(screen.getByDisplayValue(/Seleccionar categoría/i), {
    target: { value: '9' },
  });

  // Verifica que el botón de jugar ahora está habilitado
  expect(playButton).toBeEnabled();

  // Simula hacer click en el botón de jugar
  fireEvent.click(playButton);

  expect(onStartGame).toHaveBeenCalled();
});
