import React from "react";
import { connect } from "react-redux";
import { startLogin, startLogout } from "../actions/auth";

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
    else this.props.startLogout();
  };

  render() {
		let accessActions = (
			<form onSubmit={this.onSubmit} className="box-layout__box-login">
				<button className="button">Logout</button>
			</form>
		);

		if (!this.props.isAuthenticated) {
			accessActions = (
				<form onSubmit={this.onSubmit} className="box-layout__box-login">
					<h1 className="box-layout__title">Ricettario</h1>
					<label htmlFor="email">Email</label>
					<input
						id="email"
						type="text"
						value={this.state.email}
						className="text-input"
						value={this.state.email}
						onChange={this.onEmailChange}
						required
					/>
					<label htmlFor="password">Password</label>
					<input
						id="password"
						type="password"
						value={this.state.password}
						className="text-input"
						value={this.state.password}
						onChange={this.onPasswordChange}
						required
					/>
					<br />
					<button className="button">Login</button>
				</form>
			);
		}

    return (
      <div className="box-layout">
        {
					accessActions
				}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  isAuthenticated: !!state.auth.uid
});

const mapDispatchToProps = dispatch => ({
  startLogin: (email, password) => dispatch(startLogin(email, password)),
  startLogout: () => dispatch(startLogout())
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
