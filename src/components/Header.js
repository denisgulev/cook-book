import React from "react";
import { Link } from "react-router-dom";
import { startLogout, startLogin } from "../actions/auth";
import { connect } from "react-redux";

export const Header = ({
  startLogin,
  startLogout,
  isAuthenticated: isAuthenticated
}) => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title" to="/dashboard">
          <h1>CookBook</h1>
        </Link>
        {isAuthenticated ? (
          <button className="button button--link" onClick={startLogout}>
            Logout
          </button>
        ) : (
          <button className="button button--link" onClick={startLogin}>
            Login
          </button>
        )}
      </div>
    </div>
  </header>
);

const mapDispatchToProps = dispatch => ({
  startLogout: () => dispatch(startLogout()),
  startLogin: () => dispatch(startLogin())
});

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
