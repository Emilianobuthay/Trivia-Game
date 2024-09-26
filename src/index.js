// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';  // Importa el Provider
import store from './store/store';  // Importa la store que has configurado
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>  {/* Envuelve la app en el Provider */}
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
