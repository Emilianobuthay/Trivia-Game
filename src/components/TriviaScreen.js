import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, Container } from '@mui/material';
import { useTrivia } from '../hooks/useTrivia';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import he from 'he';

const TriviaScreen = () => {
  const { questions } = useSelector((state) => state.trivia);
  const { currentQuestion, handleAnswer, isGameOver } = useTrivia(questions);
  const navigate = useNavigate();

  // Estado para la respuesta seleccionada
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false); // Estado para mostrar retroalimentación
  const [allAnswers, setAllAnswers] = useState([]); // Estado para almacenar todas las respuestas mezcladas

  // Mezcla las respuestas cuando cambia currentQuestion
  useEffect(() => {
    if (currentQuestion) {
      const mixedAnswers = [
        ...currentQuestion.incorrect_answers,
        currentQuestion.correct_answer,
      ].sort(() => Math.random() - 0.5); // Mezcla aleatoriamente
      setAllAnswers(mixedAnswers);
      setSelectedAnswer(null); // Reiniciar selección al cambiar la pregunta
      setShowFeedback(false); // Reiniciar retroalimentación al cambiar la pregunta
    }
  }, [currentQuestion]);

  // Verificamos si currentQuestion está definido
  useEffect(() => {
    if (isGameOver) {
      setTimeout(() => {
        navigate('/result', { replace: true });
      }, 3000);
    }
  }, [isGameOver, navigate]);

  // Agregamos una verificación para asegurarnos de que currentQuestion existe
  if (!currentQuestion) {
    return <Typography variant="h6">Cargando preguntas...</Typography>;
  }

  // Maneja el clic en el botón de respuesta
  const handleButtonClick = (answer) => {
    if (showFeedback) return; // No permite hacer clic si ya se mostró feedback

    setSelectedAnswer(answer); // Guarda la respuesta seleccionada
    handleAnswer(answer === currentQuestion.correct_answer);
    setShowFeedback(true); // Muestra la retroalimentación

    // Resetea el estado después de un tiempo para permitir al usuario ver los colores
    setTimeout(() => {
      setSelectedAnswer(null);
      setShowFeedback(false); // Oculta la retroalimentación
    }, 3000);
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5} textAlign="center">
        <Typography variant="h4">{he.decode(currentQuestion.question)}</Typography>

        <Box mt={3}>
          {allAnswers.map((answer, index) => {
            const isSelected = selectedAnswer === answer;
            const isCorrect = answer === currentQuestion.correct_answer;

            return (
              <Button
                key={index}
                variant="contained"
                color={showFeedback 
                  ? (isSelected ? (isCorrect ? 'success' : 'error') : (isCorrect ? 'success' : 'default')) 
                  : 'primary'}
                onClick={() => handleButtonClick(answer)}
                style={{ margin: '10px', width: '100px' }} // Ancho fijo
                fullWidth
              >
                {answer}
              </Button>
            );
          })}
        </Box>
      </Box>
    </Container>
  );
};

export default TriviaScreen;
