import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import RecipeListFilters from "./RecipeListFilters";

export const Header = () => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title" to="/">
          <h1>CookBook</h1>
        </Link>
        <RecipeListFilters />
      </div>
    </div>
  </header>
);

export default connect()(Header);
