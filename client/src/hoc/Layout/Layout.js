import React, { Component } from "react";
import Aux from "../Aux";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { withRouter } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar.js";

class Layout extends Component {
  authLogout = () => {
    if (this.props.username) {
      this.props.logOut();
    }
  };

  //toggles whether the employee is signing up or logging in
  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return { isSignup: !prevState.isSignup };
    });
  };

  render() {
    return (
      <div>
        <NavBar isAuth={this.props.isAuth} authLogout={this.authLogout} />

        <Aux>
          <main>{this.props.children}</main>
        </Aux>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.auth.username,
    isAuth: state.auth.password !== null,
    error: state.auth.error,
    userPermissions: state.auth.userPermissions,
    userTypes: state.auth.userTypes,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (username, password, email, userType, isSignup) =>
      dispatch(actions.auth(username, password, email, userType, isSignup)),
    logOut: () => dispatch(actions.authLogout())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Layout)
);
