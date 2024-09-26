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
        setQuestions(fetchedQuestions);
      } catch (error) {
        setQuestions([]); // Manejo de errores, puedes agregar un mensaje también
      }
    };
    loadQuestions();
  }, [category, difficulty]);

  // Manejar la respuesta
  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setFeedback('Correct!');
      dispatch(addScore(20)); // Agrega puntaje aquí
    } else {
      setFeedback('Incorrect!');
    }

    const nextQuestionIndex = currentQuestionIndex + 1;

    if (nextQuestionIndex >= questions.length) {
      setIsGameOver(true);
    } else {
      // Esperar 4 segundos antes de pasar a la siguiente pregunta
      setTimeout(() => {
        setCurrentQuestionIndex(nextQuestionIndex);
        setFeedback(null); // Reiniciar feedback
        // Reiniciar la respuesta seleccionada (si usas un estado para ello, considera añadirlo aquí)
      }, 3000); // 4 segundos
    }
  };

  // Obtener la pregunta actual
  const currentQuestion = questions[currentQuestionIndex];
  
  return {
    questions,
    currentQuestion,
    feedback,
    isGameOver,
    handleAnswer,
  };
};
