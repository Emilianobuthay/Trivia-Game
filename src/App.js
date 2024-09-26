// src/App.js
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Cambiado Switch por Routes
import { CircularProgress } from '@mui/material';
import ProtectedRoute from './ProtectedRoute';  // Importamos la ruta protegida

const MainScreen = lazy(() => import('./components/MainScreen'));
const TriviaScreen = lazy(() => import('./components/TriviaScreen'));
const ResultsScreen = lazy(() => import('./components/ResultsScreen'));  // Ejemplo de otra pantalla

function App() {
  return (
    <Router>
      <Suspense fallback={<CircularProgress />}>
        <Routes>  {/* Cambiado Switch por Routes */}
          <Route path="/" element={<MainScreen />} />  {/* Usamos "element" en lugar de "component" */}
          <Route path="/trivia"  element={<ProtectedRoute element={<TriviaScreen />} />} />
          <Route path="/result" element={<ProtectedRoute element={<ResultsScreen />} />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
