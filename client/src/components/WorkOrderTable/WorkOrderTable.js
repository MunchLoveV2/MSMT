import React from "react";
import { Table } from "reactstrap";
import { FormControl } from "react-bootstrap";

class WorkOrderTable extends React.Component {


  render() {
    // below block of code is the logic for rendering the assign button
    // depending on the permissions of the user that is logged in
    let assignButton;
    if (this.props.userId && this.props.userPermissions) {
      this.props.userPermissions.forEach(permission => {
        if (permission.Permission.permission === "ASSIGN-TASKS") {
          assignButton = (
            <button onClick={this.props.handleWorkOrderAssign}>Assign</button>
          );
        }
      });
    }

    const workOrdersData = this.props.workOrders.map(tableRow => {
      return (
        <tr>
          <td>
            <FormControl
              type="checkbox"
              id="selected"
              value={tableRow.id}
              onChange={this.props.handleChangeCheckbox}
            />
          </td>
          <td scope="row"> {tableRow.id} </td>
          <td> {tableRow.title} </td>
          <td> {tableRow.category} </td>
          <td> {tableRow.location} </td>
          <td> {tableRow.assignedTo} </td>
          <td> {tableRow.status} </td>
        </tr>
      )
    });

    console.log(workOrdersData);


    return (
      <div>
        <Table striped>
          <thead>
            <tr>
              <th>Selected</th>
              <th>ID</th>
              <th>Issue</th>
              <th>Category</th>
              <th>Location</th>
              <th>Assigned To</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {workOrdersData}
            {/* {selectRow} */}
          </tbody>
        </Table>
        <button onClick={this.props.handleWorkOrderEdit}>Edit</button>
        {assignButton}
      </div>
    );
  }
}

export default WorkOrderTable;
