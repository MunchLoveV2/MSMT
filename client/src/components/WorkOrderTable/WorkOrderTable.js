import React from "react";
import { Table } from "reactstrap";
// import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

class WorkOrderTable extends React.Component {

  render() {
    // below block of code is the logic for rendering the assign button
    // depending on the permissions of the user that is logged in
    let assignButton;
    if (this.props.userId && this.props.userPermissions) {
      console.log(this.props.userId);
      console.log(this.props.userPermissions);
      this.props.userPermissions.forEach(permission => {
        if (permission.Permission.permission === "ASSIGN-TASKS") {
          assignButton = (
            <button onClick={this.props.handleWorkOrderAssign}>Assign</button>
          );
        }
      });
    };

    // const selectRow = {
    //   mode: "checkbox"
    // };

    return (
      <div>
        <Table striped>
          <thead>
            <tr>
              <th>ID</th>
              <th>Issue</th>
              <th>Category</th>
              <th>Location</th>
              <th>Assigned To</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {this.props.workData}
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
