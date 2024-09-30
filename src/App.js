
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  
import { CircularProgress } from '@mui/material';
import ProtectedRoute from './ProtectedRoute';  

const MainScreen = lazy(() => import('./components/MainScreen'));
const TriviaScreen = lazy(() => import('./components/TriviaScreen'));
const ResultsScreen = lazy(() => import('./components/ResultsScreen'));  

function App() {
  return (
    <Router>
      <Suspense fallback={<CircularProgress />}>
        <Routes>  
          <Route path="/" element={<MainScreen />} />  
          <Route path="/trivia"  element={<ProtectedRoute element={<TriviaScreen />} />} />
          <Route path="/result" element={<ProtectedRoute element={<ResultsScreen />} />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
