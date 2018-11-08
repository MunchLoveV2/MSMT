import React from "react";
import { reduxForm, Field } from "redux-form";
import { Table } from "reactstrap";
import Auxil from "../../hoc/Auxil";
import moment from "moment";

let WorkOrderTable = props => {
  const { handleSubmit } = props;

  let assignButton;
  if (props.userId && props.userPermissions) {
    props.userPermissions.forEach(permission => {
      if (permission.Permission.permission === "ASSIGN-TASKS") {
        assignButton = (
          <button
            onClick={handleSubmit(values =>
              props.handleWorkOrderAssign({
                ...values
              })
            )}
          >
            Assign
          </button>
        );
      }
    });
  }

  console.log(props.workOrders);

  const workOrdersData = props.workOrders.map(tableRow => {
    let assignedTo;
    if (tableRow.workOrderAssignment) {
      assignedTo = tableRow.workOrderAssignment.Userinfo.username;
    } else {
      assignedTo = "unassigned";
    }

    let createdFromNow = moment().diff(tableRow.createdAt, "minutes");
    createdFromNow =
      moment.duration(createdFromNow, "minutes").humanize() + " ago";

    return (
      <tr key={tableRow.id}>
        <td>
          <Field
            name={"workOrder" + tableRow.id}
            component="input"
            type="checkbox"
          />
        </td>
        <td> {tableRow.title} </td>
        <td> {tableRow.location} </td>
        <td> {createdFromNow} </td>
        <td> {assignedTo} </td>
        <td> {tableRow.status} </td>
      </tr>
    );
  });

  return (
    <Auxil>
      {/* handleSubmit is given to use by Redux Forms, it helps us 
            determine what happens after the form is submitted */}

      <div className="container col-md-6 center">
        <Table striped>
          <thead>
            <tr>
              <th>Selected</th>
              <th>Issue</th>
              <th>Location</th>
              <th>Time Created</th>
              <th>Assigned To</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>{workOrdersData}</tbody>
        </Table>
        <button
          onClick={handleSubmit(values =>
            props.handleWorkOrderEdit({
              ...values
            })
          )}
        >
          Edit
        </button>
        {assignButton}
      </div>
    </Auxil>
  );
};

WorkOrderTable = reduxForm({
  form: "WorkOrderTable",
  destroyOnUnmount: false
})(WorkOrderTable);

export default WorkOrderTable;
