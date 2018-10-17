import React, {Component} from "react";
import Aux from "../../hoc/Aux";
import {connect} from "react-redux";
import * as actions from "../../store/actions/index";
import {withRouter} from "react-router-dom";
import GuestAuth from "../../components/GuestAuth/GuestAuth";
import EmployeeAuth from "../../components/EmployeeAuth/EmployeeAuth";

import history from '../../history';


class Auth extends Component {

    state = {
        signupForm: {
            username: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Username'
                },
                value: ''
            },
            password: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Password'
                },
                value: ''
            },
            email: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Email'
                },
                value: ''
            }
        },
        loading: false,
        isSignup: true,
        isEmployee: false
    }

    
    // click feature that either logs the EMPLOYEE in, or creates an account
    // this feature is executed via Redux (props.onAuth => see mapDispatchToProps at the bottom)
    // employee is then redirected to the work order page
    employeeAuthClick = () => {
        const formData = {};
        
        for (let formElementIdentifier in this.state.signupForm) {
            formData[formElementIdentifier] = this.state.signupForm[formElementIdentifier].value;
        }

        console.log(formData)
        this.props.onAuth(formData.username, formData.password, formData.email, this.state.isSignup);
        history.push('/create/');

    };

    // for now, just redirects a guest to the work order page
    guestAuthClick = () => {
        history.push('/create/');

    };

    //logic to set the state of whatever user types into the forms
    inputChangedHandler = (event, inputIdentifier) => {
        const updatedSignupForm = {
            ...this.state.signupForm
        };
        const updatedFormElement = { 
            ...updatedSignupForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedSignupForm[inputIdentifier] = updatedFormElement;
        this.setState({signupForm: updatedSignupForm});
    }

    //uses Redux to log out the employee (if logged in)
    authLogout = () => {
        if(this.props.username) {
            this.props.logOut();
        } else {
            alert("no one to log out, dumbass");
        }
        
    };

    //toggles whether the user is a guest or an employee
    switchUserHandler = () => {
        this.setState(prevState => {
            return {isEmployee: !prevState.isEmployee};
        });
    }

    //toggles whether the EMPLOYEE is signing up or logging in
    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup};
        });
    }


    render () {

        const formElementsArray = [];
        for (let key in this.state.signupForm) {
            formElementsArray.push({
                id: key,
                config: this.state.signupForm[key]
            });
        }

        //form can be either "loading", "EmployeeAuth", or "GuestAuth"
        let form;
        
        if (this.props.loading) {
            form = (
                <h1> loading... </h1>
            );
        } else {
            if (this.state.isEmployee) {
                form = (
                    <EmployeeAuth 
                    changed = {this.inputChangedHandler}
                    elements = {formElementsArray}
                    buttonToggle = {this.state.isSignup ? 'REGISTER' : 'LOGIN'}
                    employeeAuthClick = {this.employeeAuthClick}
                    switchAuthModeHandler = {this.switchAuthModeHandler}
                    switchUserHandler = {this.switchUserHandler}
                    isSignup = {this.state.isSignup}
                    isAuth = {this.props.isAuth}
                    authLogout = {this.authLogout}/>
                ); 
            } else {
                form = (
                    <GuestAuth
                    guestAuthClick = {this.guestAuthClick}
                    switchUserHandler = {this.switchUserHandler}/>
                );

            }
            
        }

        let errorMessage = null;

        //the eror message is provided to us from passport.js (through redux)
        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }


        return (
            <Aux>
                {form}
                {errorMessage}
            </Aux>
        );
    }

}

//redux stuff

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        username: state.auth.username,
        isAuth: state.auth.password !== null,
        error: state.auth.error
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: ( username, password, email, isSignup ) => dispatch(actions.auth( username, password, email, isSignup )),
        logOut: () => dispatch(actions.authLogout())
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth));