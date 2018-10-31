import React from "react";
import { Button } from "react-bootstrap";
import { reduxForm, Field } from "redux-form";
import DropdownList from "react-widgets/lib/DropdownList";
import "react-widgets/dist/css/react-widgets.css";
import Aux from "../../hoc/Aux";

const renderDropdownList = ({
  input,
  data,
  valueField,
  textField,
  label,
  meta: { touched, error, warning }
}) => (
    <div>
      <label>{label}</label>
      <div>
        <DropdownList
          {...input}
          data={data}
          valueField={valueField}
          textField={textField}
          onChange={input.onChange}
        />
        {touched &&
          ((error && <span>{error}</span>) ||
            (warning && <span>{warning}</span>))}
      </div>
    </div>
  );

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
    <div>
      <label>{label}</label>
      <div>
        <input {...input} type={type} />
        {touched &&
          ((error && <span>{error}</span>) ||
            (warning && <span>{warning}</span>))}
      </div>
    </div>
  );

let EmployeeAuth = props => {
  // block of text below is logic for rendering the CREATE USER button
  // depending on the permissions of the user that is logged in
  let createUsersButton;

  if (props.userId && props.userPermissions) {
    props.userPermissions.forEach(permission => {
      if (permission.Permission.permission === "CREATE-USERS") {
        createUsersButton = (
          <Button onClick={props.switchAuthModeHandler}>
            {!props.isSignup ? "CREATE USER" : "BACK TO LOGIN"}
          </Button>
        );
      }
    });
  }

  const { handleSubmit, submitting } = props;

  // this users object is used for the dropdown (via Redux Form)
  const users = [
    { user: "Admin", value: "ADMIN" },
    { user: "Supervisor", value: "SUPERVISOR" },
    { user: "User", value: "USER" }
  ];

  // provided by the documentation from Redux Form (using react-widgets)
  // https://redux-form.com/7.4.2/examples/react-widgets/

  const required = value =>
    value || typeof value === "number" ? undefined : "Required";

  return (
    <Aux>
      {/* handleSubmit is given to use by Redux Form, it helps us 
            determine what happens after the form is submitted */}

      {/* we pass in employeeAuthClick (see container Auth), which
            is executed after the form is submitted by Redux Form */}

      <form onSubmit={handleSubmit(props.employeeAuthClick)}>
        <Field
          name="username"
          type="text"
          component={renderField}
          label="Username"
          validate={[required]}
        />

        <Field
          name="password"
          component={renderField}
          label="Password"
          type="text"
          validate={[required]}
        />

        {/* Below fields only show up when the user is signing up 
             (when the CREATE USER button is clicked)    */}
        {props.isSignup ? (
          <Aux>
            <Field
              name="email"
              component={renderField}
              label="Email"
              type="text"
              validate={[required]}
            />

            <Field
              name="userType"
              component={renderDropdownList}
              data={users}
              valueField="value"
              label="User Type"
              textField="user"
              validate={[required]}
            />
          </Aux>
        ) : null}

        <button type="submit" disabled={submitting}>
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
