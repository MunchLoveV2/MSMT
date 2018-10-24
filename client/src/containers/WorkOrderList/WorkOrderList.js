import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import WorkOrderTable from "../../components/WorkOrderTable/WorkOrderTable";
import { withRouter } from "react-router-dom";

import Select from "react-select";
import axios from "axios";

class WorkOrderList extends Component {
  state = {
    selectedUser: null,
    users: null
  };

  componentDidMount() {
    //renderWorkOrders has an axios get request, that hits the "api/workorders" route
    //the function will then dispatch "getWorkOrders" (see store => actions => workOrders)
    //getWorkOrder puts work order data in the redux store
    const query = "/api/workorders";
    this.props.renderWorkOrders(query);

    //the below axios get request hits the "api/users" route
    //gets data on all the users puts data in the local state
    axios("/api/users", {
      method: "GET"
    })
      .then(response => {
        console.log(response.data);
        const users = response.data.map(user => {
          return {
            label: user.username,
            value: user.id
          };
        });
        this.setState({ users: users });
      })
      .catch(error => {
        throw error;
      });
  }

  //gets the user that is selected (via Select) and sets state (selectedUser)
  handleUserSelect = selectedUser => {
    this.setState({ selectedUser });
  };

  //gets the workorder that is selected (via WorkOrderTable)
  //posts to workOrderAssignments SQL table
  handleWorkOrderAssign = () => {
    const workOrderIds = this.child.node.selectionContext.state.selected;
    const selectedUser = this.state.selectedUser;

    const workOrderAssignmentData = workOrderIds.map(workOrderId => {
      return {
        userId: selectedUser.value,
        workOrderId: workOrderId
      };
    });

    this.props.updateWorkOrders(workOrderAssignmentData);
  };

  render() {
    let workOrdersTable;
    let usersSelect;

    //data needs to be loaded before anything can be rendered onto the page
    if (!this.props.workOrders || !this.state.users) {
      workOrdersTable = <h1> loading </h1>;
    } else {
      //once data is stored in the redux store via props.renderWorkOrders, we can access it, and iterate over it
      const workOrdersData = this.props.workOrders.map(workOrder => {
        return {
          id: workOrder.id,
          issue: workOrder.title,
          category: workOrder.category,
          location: workOrder.location,
          dateCreated: workOrder.createdAt,
          assignedTo: workOrder.assignedTo
        };
      });

      workOrdersTable = (
        <WorkOrderTable
          // give the above workOrdersData to the workOrderTable component
          workOrders={workOrdersData}
          handleWorkOrderAssign={this.handleWorkOrderAssign}
          // syntax used based on documentation for WorkOrderTable (component uses third party package)
          ref={node => {
            this.child = node;
          }}
        />
      );

      usersSelect = (
        //Select is a third party package (react-select)
        // documentation: https://github.com/JedWatson/react-select
        <Select
          value={this.state.selectedUser}
          onChange={this.handleUserSelect}
          options={this.state.users}
        />
      );
    }

    return (
      <Aux>
        {workOrdersTable}
        {usersSelect}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    workOrders: state.workOrders.workOrders,
    users: state.auth.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    renderWorkOrders: query => dispatch(actions.renderWorkOrders(query)),
    updateWorkOrders: updatedWorkOrders =>
      dispatch(actions.updateWorkOrders(updatedWorkOrders))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(WorkOrderList)
);
