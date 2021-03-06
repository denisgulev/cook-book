import React from "react";
import {connect} from "react-redux";
import {startLogin} from "../actions/auth";
import {Redirect} from "react-router-dom";

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        };
    }

    onPasswordChange = e => {
        e.preventDefault();
        const password = e.target.value;
        this.setState(() => ({
            password
        }));
    };

    onEmailChange = e => {
        e.preventDefault();
        const email = e.target.value;
        this.setState(() => ({
            email
        }));
    };

    onSubmit = e => {
        // prevent default page refresh
        e.preventDefault();
        if (!this.props.isAuthenticated) this.props.startLogin(this.state.email, this.state.password);
    };

    render() {

        return (
            <div className="box-layout">
                {
                    this.props.isAuthenticated ?
                        <Redirect to="/" />
                        :
                        <form onSubmit={this.onSubmit} className="box-layout__box-login">
                            <h1 className="box-layout__title">Ricettario</h1>
                            <label htmlFor="email">Email</label>
                            <input
                            id="email"
                            type="text"
                            value={this.state.email}
                            className="text-input"
                            onChange={this.onEmailChange}
                            required
                            />
                            <label htmlFor="password">Password</label>
                            <input
                            id="password"
                            type="password"
                            value={this.state.password}
                            className="text-input"
                            onChange={this.onPasswordChange}
                            required
                            />
                            <br/>
                            <button className="button">Login</button>
                        </form>
                }
            </div>
        );
    }
}

const mapStateToProps = (state, props) => ({
    isAuthenticated: !!state.auth.uid
});

const mapDispatchToProps = dispatch => ({
    startLogin: (email, password) => dispatch(startLogin(email, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
