import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { reset } from "redux-form";
import { withRouter } from "react-router-dom";
import EmployeeAuth from "../../components/EmployeeAuth/EmployeeAuth";

class Auth extends Component {
  // this state gets toggled when the CREATE USER button clicked
  // (see component => EmployeeAuth => EmployeeAuth)
  state = {
    isSignup: false
  };

  //what happens when an employee clicks "submit"
  employeeAuthClick = values => {
    let userType;

    if (this.state.isSignup) {
      userType = values.userType.value;
    }

    this.props.onAuth(
      values.username,
      values.password,
      values.phoneNumber,
      userType,
      this.state.isSignup
    );

    alert("success");
    this.props.resetEmployeeAuth();
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
        />
        {errorMessage}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.auth.username,
    isAuth: state.auth.password !== null,
    error: state.auth.error,
    userPermissions: state.auth.userPermissions,
    userType: state.auth.userType,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    resetEmployeeAuth: () => dispatch(reset("EmployeeAuth")),
    onAuth: (username, password, phoneNumber, userType, isSignup) =>
      dispatch(
        actions.auth(username, password, phoneNumber, userType, isSignup)
      )
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Auth)
);
