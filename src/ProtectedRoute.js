
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; 

const ProtectedRoute = ({ element }) => {
    const { play } = useSelector((state) => state.trivia);  

  return play ? element : <Navigate to="/" />;  
};

export default ProtectedRoute;