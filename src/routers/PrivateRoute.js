import React, {Fragment} from "react";
import {connect} from "react-redux";
import {Route, Redirect} from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const PrivateRoute = ({
    isAuthenticated,
    component: Component,
    path: newPath
}) => (
    <Route
        path={newPath}
        component={props =>
            isAuthenticated ? (
                <Fragment>
                    <Header/>
                    <Component {...props} />
                    <Footer/>
                </Fragment>
            ) : (
                <Redirect to="/login"/>
            )
        }
    />
);

const mapStateToProps = state => ({
    isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PrivateRoute);
