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
    }
    console.log("THESE ARE THE RPOPS>>>>>>", this.props);

    // const selectRow = {
    //   mode: "checkbox"
    // };

    return (
      <div>
        <Table hover>
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
            {/* <th scope="row" key={this.props.workData.id} />
            <td>{this.props.workData.issue}</td>
            <td>{this.props.workData.category}</td>
            <td>{this.props.workData.location}</td>
            <td>{this.props.workData.assignedTo}</td>
            <td>{this.props.workData.status}</td> */}
          </tbody>
        </Table>
        <button onClick={this.props.handleWorkOrderEdit}>Edit</button>
        {assignButton}
      </div>
    );
  }
}

export default WorkOrderTable;
