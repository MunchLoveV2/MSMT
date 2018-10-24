import React from 'react';
import {Button} from 'react-bootstrap';
import {reduxForm, Field} from "redux-form";
import Aux from "../../hoc/Aux"; 


let EmployeeAuth = (props) => {

    const { handleSubmit } = props;
    return (
        <Aux>

            {/* handleSubmit is given to use by Redux Forms, it helps us 
            determine what happens after the form is submitted */}
            
            <form onSubmit= {handleSubmit(props.employeeAuthClick)}>
                <div>
                    <label htmlFor="username">User Name</label>
                    <Field name="username" component="input" type="text" />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <Field name="password" component="input" type="text" />
                </div>

                {props.isSignup
                    ? 
                    <Aux>
                        <div>
                            <label htmlFor="email">Email</label>
                            <Field name="email" component="input" type="text" />
                        </div>
                        <div>
                            <label htmlFor="userType">User Type</label>
                            <Field name="userType" component="input" type="text" />
                        </div>
                    </Aux>
                    : null
                }

                <button type="submit">Submit</button>
            </form>
    
            {/* logout button only shows up if user is in local storage */}     
            {props.isAuth
                ? <Button 
                onClick={props.authLogout}> Logout </Button>
                : null
            }

            {/* // this is the toggle button to determine login vs register */} 
            <Button 
                onClick={props.switchAuthModeHandler}>
                SWITCH TO {props.isSignup ? 'SIGNIN' : 'SIGNUP'} </Button> 

        </Aux>
    );
}
    

    
EmployeeAuth = reduxForm({
    form: "employeeAuth",
    destroyOnUnmount: false
})(EmployeeAuth)


export default EmployeeAuth;