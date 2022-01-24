import { NavLink } from 'react-router-dom';

import './styles.scss';

const Header = ({ categories, onZenModeClick, isZenMode }) => (
  <header className="menu">
    <nav>
      {
        categories.map((category) => (
          // ATTENTION ! en React, on ne fait pas de <a> pour nos liens INTERNES
          // On va utiliser le composant Link à la place
          // petite subtilité : on écrira to= au lieu de href=
          <NavLink
            key={category.route}
            // la classe dans activeClassName sera ajoutée
            // si l'url courante correspond au lien du bouton
            //activeClassName="menu-link--selected"
            className={(navData) => navData.isActive ? "menu-link--selected menu-link" : "menu-link" }
            // on retrouve la prop exact comme sur les Routes
            // pour activer la activeClassName que si l'url correspond EXACTEMENT
            //exact
            //NavLink exact prop has been replaced by for react-router-dom 6
            to={category.route}
          >
            {category.label}
          </NavLink>
        ))
      }
      <button
        className="menu-btn"
        type="button"
        onClick={onZenModeClick}
      >
        {isZenMode ? 'Désactiver le mode zen' : 'Activer le mode zen'}
      </button>
    </nav>
  </header>
);

export default Header;