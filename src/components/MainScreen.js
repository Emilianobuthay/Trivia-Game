// src/components/MainScreen.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory, setDifficulty, exitGame, setPlay } from '../Redux/triviaSlice';
import { Button, Select, MenuItem, Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getCategoryList } from '../api/triviaApi';


const MainScreen = () => {
  const { score, difficulty2, category2, attempts } = useSelector((state) => state.trivia);
  const [category, setCategoryValue] = useState('');
  const [difficulty, setDifficultyValue] = useState('');
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Usar useNavigate aquí

  
  useEffect(() => {
    dispatch(exitGame());
    dispatch(setPlay(false));
    const fetchCategories = async () => {
      try {
        const categoryList = await getCategoryList();
        setCategories(categoryList);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);
   
  const handleStartGame = () => {
    if (category && difficulty) {
    dispatch(setPlay(true));
    dispatch(setCategory(category));
    dispatch(setDifficulty(difficulty));
    navigate('/trivia'); // Navegar a la pantalla de trivia
}};

console.log(score, difficulty, category);

  return (
    <Container maxWidth="sm">
      <Box mt={5} textAlign="center">
        <Typography variant="h3" gutterBottom>
          Configura tu Trivia
        </Typography>
        <Typography variant="h6" gutterBottom>
          Selecciona la temática y dificultad
        </Typography>

        <Box mb={2}>
          <Select
            fullWidth
            value={category}
            onChange={(e) => setCategoryValue(e.target.value)}
            displayEmpty
          >
            {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
          </Select>
        </Box>

        <Box mb={2}>
          <Select
            fullWidth
            value={difficulty}
            onChange={(e) => setDifficultyValue(e.target.value)}
          >
            <MenuItem value="easy">Fácil</MenuItem>
            <MenuItem value="medium">Medio</MenuItem>
            <MenuItem value="hard">Difícil</MenuItem>
          </Select>
        </Box>

        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleStartGame}
          disabled={!category}
        >
          Jugar!
        </Button>
      </Box>
    </Container>
  );
};

export default MainScreen;
