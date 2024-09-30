import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCategory, setNameCategory, setDifficulty, exitGame, setPlay } from '../Redux/triviaSlice';
import { Button, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getCategoryList } from '../api/triviaApi';
import '../style/MainScreen.css'; 

const MainScreen = () => {
  const [category, setCategoryValue] = useState('');
  const [difficulty, setDifficultyValue] = useState('');
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  }, [dispatch]);

  const handleStartGame = () => {
    if (category.id && difficulty) {
      dispatch(setPlay(true));
      dispatch(setNameCategory(category.name));
      dispatch(setCategory(category.id));
      dispatch(setDifficulty(difficulty));
      navigate('/trivia');
    }
  };

  const handleCategoryChange = (event, newCategory) => {
    if (newCategory !== null) {
      setCategoryValue(newCategory);
    }
  };

  const handleDifficultyChange = (event, newDifficulty) => {
    if (newDifficulty !== null) {
      setDifficultyValue(newDifficulty);
    }
  };

  return (
    <div className="main-container">
    <div className="header">
      <h2 className="title">Trivia</h2>
    </div>
    <h1 className="section-title">Seleccionar Categoria</h1>
    <div className="toggle-group-container">
      <ToggleButtonGroup
        color="primary"
        value={category}
        exclusive
        onChange={handleCategoryChange}
        aria-label="Category selection"
        className="toggle-group-d"
      >
        {categories.map((cat) => (
          <ToggleButton key={cat.id} value={cat} className="toggle-button">
            {cat.name}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
    <h1 className="section-title">Seleccionar Dificultad</h1>
    <ToggleButtonGroup
      color="primary"
      value={difficulty}
      exclusive
      onChange={handleDifficultyChange}
      aria-label="Difficulty selection"
      className="toggle-group"
    >
      <ToggleButton value="easy" className="toggle-button">Facil</ToggleButton>
      <ToggleButton value="medium" className="toggle-button">Medio</ToggleButton>
      <ToggleButton value="hard" className="toggle-button">Dificil</ToggleButton>
      <ToggleButton value="random" className="toggle-button">Aleatorio</ToggleButton>
    </ToggleButtonGroup>
    <div className="play-button-container">
      <Button className="play-button" onClick={handleStartGame} disabled={!category.id || !difficulty}>
        Play!
      </Button>
    </div>
  </div>
  );
};

export default MainScreen;
