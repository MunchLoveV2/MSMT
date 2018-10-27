import React from "react";
import { Button } from "react-bootstrap";
import { reduxForm, Field } from "redux-form";
import DropdownList from "react-widgets/lib/DropdownList";
import "react-widgets/dist/css/react-widgets.css";
import Aux from "../../hoc/Aux";

let EmployeeAuth = props => {
  // block of text below is logic for rendering the CREATE USER button
  // depending on the permissions of the user that is logged in
  let createUsersButton;

  if (props.userId && props.userPermissions) {
    props.userPermissions.forEach(permission => {
      if (permission.Permission.permission === "CREATE-USERS") {
        createUsersButton = (
          <Button onClick={props.switchAuthModeHandler}>CREATE USER</Button>
        );
      }
    });
  }

  const { handleSubmit } = props;

  // this users object is used for the dropdown (via Redux Form)
  const users = [
    { user: "Admin", value: "ADMIN" },
    { user: "Supervisor", value: "SUPERVISOR" },
    { user: "User", value: "USER" }
  ];

  // provided by the documentation from Redux Form (using react-widgets)
  // https://redux-form.com/7.4.2/examples/react-widgets/
  const renderDropdownList = ({ input, data, valueField, textField }) => (
    <DropdownList
      {...input}
      data={data}
      valueField={valueField}
      textField={textField}
      onChange={input.onChange}
    />
  );

  return (
    <Aux>
      {/* handleSubmit is given to use by Redux Form, it helps us 
            determine what happens after the form is submitted */}

      {/* we pass in employeeAuthClick (see container Auth), which
            is executed after the form is submitted by Redux Form */}

      <form onSubmit={handleSubmit(props.employeeAuthClick)}>
        <div>
          <label htmlFor="username">User Name</label>
          <Field name="username" component="input" type="text" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <Field name="password" component="input" type="text" />
        </div>

        {/* Below fields only show up when the user is signing up 
             (when the CREATE USER button is clicked)    */}
        {props.isSignup ? (
          <Aux>
            <div>
              <label htmlFor="email">Email</label>
              <Field name="email" component="input" type="text" />
            </div>
            <div>
              <label htmlFor="userType">User Type</label>
              <Field
                name="userType"
                component={renderDropdownList}
                data={users}
                valueField="value"
                textField="user"
              />
            </div>
          </Aux>
        ) : null}

        <button type="submit">
          {props.isSignup ? "CREATE USER" : "LOGIN"}
        </button>
      </form>

      {/* logout button only shows up if user is in local storage */}
      {props.isAuth ? (
        <Button onClick={props.authLogout}> Logout </Button>
      ) : null}

      {/* CREATE USER button */}
      {createUsersButton}
    </Aux>
  );
};

EmployeeAuth = reduxForm({
  form: "EmployeeAuth",
  destroyOnUnmount: false
})(EmployeeAuth);

export default EmployeeAuth;
