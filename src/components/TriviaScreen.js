import React, { useState, useEffect } from 'react';
import { Button, Box, Typography } from '@mui/material';
import { useTrivia } from '../hooks/useTrivia';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import he from 'he';
import '../style/TriviaScreen.css';

const TriviaScreen = () => {
  const { questions } = useSelector((state) => state.trivia);
  const { currentQuestion, currentQuestionIndex, handleAnswer, isGameOver, goToNextQuestion } = useTrivia();
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

  console.log(currentQuestion)
  return (
    <div className="trivia-container">
      <Box textAlign="center" className="trivia-content">
        <Typography variant="h6" className="question-counter">
          Pregunta {currentQuestionIndex + 1}/{questions.length}
        </Typography>
        
        <Typography variant="h4" className="trivia-question">
          {he.decode(currentQuestion.question)}
        </Typography>
        <Box mt={3} className="answers-container">
          {allAnswers.map((answer, index) => {
            const isSelected = selectedAnswer === answer;
            const isCorrect = answer === currentQuestion.correct_answer;
            return (
              <Button
                key={index}
                variant="contained"
                className={`answer-button ${showFeedback ? (isSelected ? (isCorrect ? 'correct' : 'incorrect') : (isCorrect ? 'correct' : 'default')) : 'primary'}`}
                onClick={() => handleButtonClick(answer)}
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
            className="next-button"
          >
            Siguiente
          </Button>
        )}
      </Box>
    </div>
  );
};

export default TriviaScreen;
