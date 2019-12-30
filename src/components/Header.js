import React from "react";
import { NavLink } from "react-router-dom";
import { startLogout } from "../actions/auth";
import { connect } from "react-redux";

export const Header = ({ startLogout }) => (
  <header>
    <h1>CookBook</h1>
    <NavLink to="/dashboard" activeClassName="is-active" exact={true}>
      Dashboard -{" "}
    </NavLink>
    <NavLink to="/create" activeClassName="is-active">
      Create Recipe
    </NavLink>
    <button onClick={startLogout}>Logout</button>
  </header>
);

const mapDispatchToProps = dispatch => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);
