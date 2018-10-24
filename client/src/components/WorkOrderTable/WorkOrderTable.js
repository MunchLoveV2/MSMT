import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

class WorkOrderTable extends React.Component {
  render() {
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
      }
    ];

    const selectRow = {
      mode: "checkbox"
    };

    return (
      <div>
        <BootstrapTable
          keyField="id"
          ref={node => {
            this.node = node;
          }}
          data={this.props.workOrders}
          columns={columns}
          selectRow={selectRow}
        />
        <button onClick={this.props.handleWorkOrderAssign}>Assign</button>
      </div>
    );
  }
}

export default WorkOrderTable;
