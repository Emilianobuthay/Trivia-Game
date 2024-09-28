import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, Container } from '@mui/material';
import { useTrivia } from '../hooks/useTrivia';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import he from 'he';

const TriviaScreen = () => {
  const { questions } = useSelector((state) => state.trivia);
  const { currentQuestion, currentQuestionIndex, handleAnswer, isGameOver, goToNextQuestion } = useTrivia(questions);
  const navigate = useNavigate();

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [allAnswers, setAllAnswers] = useState([]);

  useEffect(() => {
    if (currentQuestion) {
      const mixedAnswers = [
        ...currentQuestion.incorrect_answers,
        currentQuestion.correct_answer,
      ].sort(() => Math.random() - 0.5);
      setAllAnswers(mixedAnswers);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  }, [currentQuestion]);

  useEffect(() => {
    if (isGameOver) {
      setTimeout(() => {
        navigate('/result', { replace: true });
      }, 1000);
    }
  }, [isGameOver, navigate]);

  if (!currentQuestion) {
    return <Typography variant="h6">Cargando preguntas...</Typography>;
  }

  const handleButtonClick = (answer) => {
    if (showFeedback) return;
    setSelectedAnswer(answer);
    handleAnswer(answer === currentQuestion.correct_answer);
    setShowFeedback(true);
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5} textAlign="center">
        {/* Agregar contador de preguntas */}
        <Typography variant="h6">
          Pregunta {currentQuestionIndex + 1}/5
        </Typography>
        
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
                style={{ margin: '10px', width: '100px' }}
                fullWidth
              >
                {answer}
              </Button>
            );
          })}
        </Box>
        {showFeedback && (
          <Button
            variant="contained"
            color="primary"
            onClick={goToNextQuestion}
            style={{ marginTop: '20px' }}
          >
            Next
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default TriviaScreen;
