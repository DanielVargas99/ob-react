// Imports de React
import React from 'react';
import ReactDOM from 'react-dom';
// Añadimos bootstrap a nuestro proyecto
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
// Importante: Los estilos propios deben ir debajo del de bootstrap, para que no los pise
import './styles/index.css';

// Imports de Redux
// import { Provider } from 'react-redux';

import App from './components/App';

// TODO: Si trabajamos con Redux, crear el Store y aplicar el middleware de Redux Saga

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
    document.getElementById('root'),
);
