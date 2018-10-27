import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

class WorkOrderTable extends React.Component {
  render() {
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

    const columns = [
      {
        dataField: "id",
        text: "ID"
      },
      {
        dataField: "issue",
        text: "Issue"
      },
      {
        dataField: "category",
        text: "Category"
      },
      {
        dataField: "location",
        text: "Location"
      },
      {
        dataField: "assignedTo",
        text: "Assigned To"
      },
      {
        dataField: "status",
        text: "Status"
      }
    ];

    const selectRow = {
      mode: "checkbox"
    };

    return (
      <div>
        {/* This is a table that is given to us via a third party package.
        It's packed with cool features, but I'm not in love with. Might 
        need to just build the table ourselves. */}

        {/* Link to documentation for this table:
        https://github.com/react-bootstrap-table/react-bootstrap-table2 */}

        <BootstrapTable
          keyField="id"
          ref={node => {
            this.node = node;
          }}
          data={this.props.workOrders}
          columns={columns}
          selectRow={selectRow}
          onClick={(e, row, rowIndex) => {
            console.log(`clicked on row with index: ${rowIndex}`);
          }}
        />

        <button onClick={this.props.handleWorkOrderEdit}>Edit</button>
        {assignButton}
      </div>
    );
  }
}

export default WorkOrderTable;
