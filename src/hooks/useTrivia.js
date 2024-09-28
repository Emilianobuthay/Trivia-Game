import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addScore } from '../Redux/triviaSlice';

export const useTrivia = (initialQuestions) => {
  const { category, difficulty } = useSelector((state) => state.trivia);
  const [questions, setQuestions] = useState(initialQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadQuestions = async () => {
      const { fetchQuestions } = await import('../api/triviaApi');
      try {
        const fetchedQuestions = await fetchQuestions(category, difficulty);
        setQuestions(fetchedQuestions.slice(0, 5)); // Limitar a 5 preguntas
      } catch (error) {
        setQuestions([]);
      }
    };
    loadQuestions();
  }, [category, difficulty]);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setFeedback('Correct!');
      dispatch(addScore(20));
    } else {
      setFeedback('Incorrect!');
    }
  };

  const goToNextQuestion = () => {
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex >= questions.length) {
      setIsGameOver(true);
    } else {
      setCurrentQuestionIndex(nextQuestionIndex);
      setFeedback(null);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return {
    questions,
    currentQuestion,
    currentQuestionIndex, // Añadir esto para el contador
    feedback,
    isGameOver,
    handleAnswer,
    goToNextQuestion,
  };
};
