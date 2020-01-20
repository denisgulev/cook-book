import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import Header from "../components/Header";

export const PublicRoute = ({ component: Component, path: newPath }) => (
  <Route
    path={newPath}
    component={props => (
      <div>
        <Header />
        <Component {...props} />
      </div>
    )}
  />
);

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PublicRoute);
