import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { resetGame, exitGame, addAttempts } from '../Redux/triviaSlice';
import { useNavigate } from 'react-router-dom';
import '../style/ResultsScreen.css';


const ResultsScreen = () => {
  const { score, difficulty, nameCategory, attempts, questions } = useSelector((state) => state.trivia);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRestart = () => {
    dispatch(resetGame());
    dispatch(addAttempts(1));
    navigate('/trivia', { replace: true });
  };

  const handleExit = () => {
    dispatch(exitGame());
    navigate('/', { replace: true });
  };
  console.log(questions)

  return (
    <>
    <Box className="results-container">
      <Typography variant="h2" className="results-title">¡Has terminado!</Typography>
      <Typography variant="h4" className="results-score">Tu puntaje: {score}</Typography>
      <Typography variant="h6" className="results-info">Dificultad: {difficulty}</Typography>
      <Typography variant="h6" className="results-info">Categoría: {nameCategory}</Typography>
      <Typography variant="h6" className="results-info">Intentos: {attempts}</Typography>
      <Box className="button-container">
        <Button onClick={handleRestart} variant="contained" className="action-button">Reiniciar</Button>
        <Button onClick={handleExit} variant="contained" className="action-button">Salir</Button>
      </Box>
    </Box>
    </>
  );
};

export default ResultsScreen;
