import React from "react";
import { Link } from "react-router-dom";

import RecipesListFilters from "./RecipesDashboard/RecipesListFilters/RecipesListFilters";

export const Header = () => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title" to="/">
          <h1>CookBook</h1>
        </Link>
        <RecipesListFilters />
      </div>
    </div>
  </header>
);

export default Header;
