import React from 'react';
import FormInput  from "../UI/FormInputs/FormInputs";
import { Form, Button} from 'react-bootstrap';


function GuestAuth(props) {

  return (
    <div>
        <Form>
            <FormInput
                title = "LastName"
                heading = "Last Name"
                placeholder = "Last Name"/>
            <FormInput
                title = "RoomNumber"
                heading = "Room Number"
                placeholder = "Your Room Number"/>
            <Button 
                type = "submit"
                onClick = {props.guestAuthClick}> Enter </Button>
            <Button onClick={props.switchUserHandler}> Switch to Employee Login</Button>
        </Form>


    </div>
  );
}

export default GuestAuth;