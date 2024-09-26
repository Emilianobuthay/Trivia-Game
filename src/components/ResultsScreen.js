// src/components/ResultsScreen.js
import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { resetGame, exitGame, addAttempts } from '../Redux/triviaSlice';
import { useNavigate } from 'react-router-dom';

const ResultsScreen = () => {
  const { score, difficulty, category, attempts } = useSelector((state) => state.trivia);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Para redirigir a la pantalla principal

  const handleRestart = () => {
    dispatch(resetGame());
    dispatch(addAttempts(1));
    navigate('/trivia', { replace: true }); // Llama a la función para reiniciar la trivia
  };

  const handleExit = () => {
    dispatch(exitGame());
    navigate('/', { replace: true }); // Redirige a la pantalla principal
  };

  console.log(score, difficulty, category);

  return (
    <Box textAlign="center" mt={5}>
      <Typography variant="h4">Tu puntaje: {score}</Typography>
      <Typography variant="h6">Dificultad: {difficulty}</Typography>
      <Typography variant="h6">Categoría: {category}</Typography>
      <Typography variant="h6">Intentos: {attempts}</Typography>
      <Box mt={2}>
        <Button onClick={handleRestart} variant="contained" style={{ margin: '10px' }}>
          Reiniciar
        </Button>
        <Button onClick={handleExit} variant="contained" style={{ margin: '10px' }}>
          Salir
        </Button>
      </Box>
    </Box>
  );
};

export default ResultsScreen;
