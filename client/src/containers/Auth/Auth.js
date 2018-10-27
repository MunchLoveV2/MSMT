import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { withRouter } from "react-router-dom";
import EmployeeAuth from "../../components/EmployeeAuth/EmployeeAuth";

class Auth extends Component {
  //toggles between register and login
  state = {
    isSignup: false
  };

  //what happens when an employee clicks "submit"
  employeeAuthClick = values => {
    let userType;

    if (this.state.isSignup) {
      userType = values.userType.value;
    }
    //console.log(values.userType.value);
    this.props.onAuth(
      values.username,
      values.password,
      values.email,
      userType,
      this.state.isSignup
    );

    if (!this.state.isSignup) {
      this.props.history.replace("/workorders/");
    }
  };

  //uses Redux to log out the employee (if logged in)
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
    let errorMessage = null;

    //the eror message is provided to us from passport.js (through redux)
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

    return (
      <Aux>
        <EmployeeAuth
          isSignup={this.state.isSignup}
          userId={this.props.userId}
          userPermissions={this.props.userPermissions}
          switchAuthModeHandler={this.switchAuthModeHandler}
          employeeAuthClick={this.employeeAuthClick}
          isAuth={this.props.isAuth}
          authLogout={this.authLogout}
        />
        {errorMessage}
      </Aux>
    );
  }
}

//redux stuff

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
  )(Auth)
);
