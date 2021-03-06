import React, {Fragment} from "react";
import {connect} from "react-redux";
import {Route} from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const PublicRoute = ({component: Component, path: newPath}) => (
    <Route
        path={newPath}
        component={props => (
            <Fragment>
                <Header/>
                <Component {...props} />
                <Footer/>
            </Fragment>
        )}
    />
);

const mapStateToProps = state => ({
    isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PublicRoute);
