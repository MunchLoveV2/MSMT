import React, {Component} from "react";
import Aux from "../../hoc/Aux";
import {connect} from "react-redux";
import * as actions from "../../store/actions/index";
import {withRouter} from "react-router-dom";
import EmployeeAuth from "../../components/EmployeeAuth/EmployeeAuth";

import history from '../../history';


class Auth extends Component {

    //toggles between register and login
    state = {
        isSignup: false
    }


    //what happens when an employee clicks "submit"
    employeeAuthClick = (values) => {

        this.props.onAuth(values.username, values.password, values.email, values.userType, this.state.isSignup);
        history.push('/create/');

    };


    //uses Redux to log out the employee (if logged in)
    authLogout = () => {
        if(this.props.username) {
            this.props.logOut();
        } 
    };

     //toggles whether the employee is signing up or logging in
     switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup};
        });
    }




    render () {

        let errorMessage = null;

        //the eror message is provided to us from passport.js (through redux)
        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }


        return (
            <Aux>
                <EmployeeAuth 
                    isSignup = {this.state.isSignup}
                    switchAuthModeHandler = {this.switchAuthModeHandler}
                    employeeAuthClick = {this.employeeAuthClick}
                    isAuth = {this.props.isAuth}
                    authLogout = {this.authLogout}/>
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
        error: state.auth.error     
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: ( username, password, email, userType, isSignup ) => dispatch(actions.auth( username, password, email, userType, isSignup )),
        logOut: () => dispatch(actions.authLogout())
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth));