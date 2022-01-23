// == Import : npm
import { BrowserRouter } from 'react-router-dom';
import React from "react";
import ReactDOM from 'react-dom';

// == Import : local
// Composants
import Blog from './components/Blog';
// Styles
import './styles/index.scss';

// = Render
// pour pouvoir utiliser le routeur,
// il nous faut englober toute l'application dans le composant
// BrowserRouter
ReactDOM.render(
  <React.StrictMode>
   <BrowserRouter>
      <Blog />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
