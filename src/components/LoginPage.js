import React from 'react';
import { connect } from 'react-redux';
import { startLogin, startLogout } from '../actions/auth';

export class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
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
    this.props.startLogin(this.state.email, this.state.password);
  };

  render() {
    return (
      <div className="box-layout">
        <div className="box-layout__box">
          {!this.props.isAuthenticated ? (
            <form onSubmit={this.onSubmit}>
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
              <button className="button">Login</button>
            </form>
          ) : (
            <button className="button" onClick={this.props.startLogout}>
              Logout
            </button>
          )}
        </div>
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
