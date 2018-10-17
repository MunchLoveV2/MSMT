import React from 'react';
import FormInput  from "../UI/FormInputs/FormInputs";
import {Form, Button} from 'react-bootstrap';


function GuestAuth(props) {
    const formElementsArray = props.elements;
    console.log(formElementsArray);
    if (!props.isSignup) {
        formElementsArray.splice(2,1)
    }

    let form = (
        formElementsArray.map(formElement => (
            <FormInput 
                key={formElement.id}
                heading = {formElement.id}
                placeholder = {formElement.id}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={(event) => props.changed(event, formElement.id)} />
        ))
    );


  return (
    <div>
        <Form>
            {form}
            
            <Button onClick = {props.employeeAuthClick}>
              {props.buttonToggle} </Button>
            
            <Button 
                    onClick={props.switchAuthModeHandler}>
                    SWITCH TO {props.isSignup ? 'SIGNIN' : 'SIGNUP'} </Button>

            {props.isAuth
                ? <Button 
                onClick={props.authLogout}> Logout </Button>
                : null
            } 

            <Button onClick = {props.switchUserHandler}>
              Switch to Guest Login </Button>
            
        </Form>


    </div>
  );
}

export default GuestAuth;