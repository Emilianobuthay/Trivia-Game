// src/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Importamos el hook del contexto

const ProtectedRoute = ({ element }) => {
    const { play } = useSelector((state) => state.trivia);  // Usamos el estado global

  return play ? element : <Navigate to="/" />;  // Si no se ha iniciado el juego, redirige al home
};

export default ProtectedRoute;