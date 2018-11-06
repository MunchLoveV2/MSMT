import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import WorkOrderTable from "../../components/WorkOrderTable/WorkOrderTable";
import AlertToggle from "../../components/AlertToggle/AlertToggle";
import { withRouter } from "react-router-dom";
import Select from "react-select";
import axios from "axios";

class WorkOrderList extends Component {
  state = {
    isAlert: true,
    selectedUser: null,
    selectedWorkOrder: null,
    users: null,
    currentWorkOrder: null
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

  // gets the user that is selected (via Select) and sets state (selectedUser)
  handleUserSelect = selectedUser => {
    this.setState({ selectedUser });
  };

  handleIsAlert = isAlert => {
    this.setState({ isAlert });
  };

  // we use this function to get the information (in SQL) of the work order that is selected
  // we grab it from SQL and then put it into redux via props.getCurrentWorkOrder
  handleWorkOrderEdit = () => {
    // below syntax looks funky, I know, but I got it from the documentation of
    // the bootstrap table (see components => WorkOrderTable)
    const workOrderIds = this.child.node.selectionContext.state.selected;

    if (workOrderIds.length > 1) {
      alert("Can only edit one work order at once!");
    } else {
      axios
        .get("/api/workorders/" + workOrderIds[0])
        .then(response => {
          console.log(response.data);
          //puts the current work order data into Redux
          this.props.getCurrentWorkOrder(response.data);
          this.props.history.replace("/edit/");
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  //gets the workorder that is selected (via WorkOrderTable)
  //POST or PUT to workOrderAssignments SQL table
  handleWorkOrderAssign = () => {
    // below syntax looks funky, I know, but I got it from the documentation of
    // the bootstrap table (see components => WorkOrderTable)
    const workOrderIds = this.child.node.selectionContext.state.selected;
    const selectedUser = this.state.selectedUser;

    if (!selectedUser || workOrderIds.length === 0) {
      alert("You have not selected a user or work order!");
    } else {
      // we need to use the map method because there might be more than
      // 1 work order that is selected
      const workOrderAssignmentData = workOrderIds.map(workOrderId => {
        return {
          userId: selectedUser.value,
          workOrderId: workOrderId
        };
      });

      // props.assignWorkOrders is used to either POST or PUT to workOrderAssignments SQL table
      // see store => workOrders
      this.props.assignWorkOrders(workOrderAssignmentData);
      this.setState({ selectedUser: null });
    }
  };

  // workData = () => {
  //   this.workOrdersData.map((item, i) => {
  //     return (
  //       <tr>
  //         <th scope="row" key={i} />
  //         <td>{item.id}</td>
  //         <td>{item.issue}</td>
  //         <td>{item.status}</td>
  //         <td>{item.category}</td>
  //         <td>{item.location}</td>
  //       </tr>
  //     );
  //   });
  // };

  render() {
    let workOrdersTable;
    let usersSelect;
    let workOrdersData = [];
    let alertToggle;

    //data needs to be loaded before anything can be rendered onto the page
    if (!this.props.workOrders[0] || !this.state.users) {
      workOrdersTable = <h1> loading </h1>;
    } else {
      //once data is stored in the redux store.... via props.renderWorkOrders, we can access it, and iterate over it
      this.props.workOrders.forEach(workOrder => {
        let item = {
          id: workOrder.id,
          issue: workOrder.title,
          status: workOrder.status,
          category: workOrder.category,
          location: workOrder.location,
          dateCreated: workOrder.createdAt,
          pictureDataUri: workOrder.pictureDataUri
        };

        // the workorder is either set as unassigned, or gets assigned user in SQL
        if (workOrder.workOrderAssignment) {
          item.assignedTo = workOrder.workOrderAssignment.Userinfo.username;
        } else {
          item.assignedTo = "unassigned";
        }

        workOrdersData.push(item);
        console.log(workOrdersData);
      });

      workOrdersTable = (
        <WorkOrderTable
          // give the above workOrdersData to the workOrderTable component
          userId={this.props.userId}
          userPermissions={this.props.userPermissions}
          // workOrders={workOrdersData}
          workData={this.workData}
          onChange={this.handleWorkOrderSelect}
          handleWorkOrderEdit={this.handleWorkOrderEdit}
          handleWorkOrderAssign={this.handleWorkOrderAssign}
          // syntax used based on documentation for WorkOrderTable (looks funky, I know)
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

    if (this.state.selectedUser) {
      alertToggle = (
        <AlertToggle
          handleIsAlert={this.handleIsAlert}
          isAlert={this.state.isAlert}
        />
      );
    }

    return (
      <Aux>
        {workOrdersTable}
        {usersSelect}
        {alertToggle}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    workOrders: state.workOrders.workOrders,
    users: state.auth.users,
    userId: state.auth.userId,
    userPermissions: state.auth.userPermissions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    renderWorkOrders: query => dispatch(actions.renderWorkOrders(query)),
    assignWorkOrders: updatedWorkOrders =>
      dispatch(actions.assignWorkOrders(updatedWorkOrders)),
    getCurrentWorkOrder: currentWorkOrder =>
      dispatch(actions.getCurrentWorkOrder(currentWorkOrder))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(WorkOrderList)
);
