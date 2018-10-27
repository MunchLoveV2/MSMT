import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actions from "../../store/actions/index";

//this is the container to edit work orders when "edit" button is clicked
class EditWorkOrder extends Component {
  /* accesses handleWorkOrderCompleted in Redux to change the work order status
  to "completed" in SQL */
  handleWorkOrderCompleted = () => {
    // function given to us by Redux
    this.props.handleWorkOrderCompleted(this.props.currentWorkOrder.id);
    // takes us back to the work orders table
    this.props.history.replace("/workorders");
  };

  render() {
    // need to declare separate variable here because we get "this.props.currentWorkOrder" asynchronously
    // this.props.currentWorkOrder gives us access to the specific work order's information

    let title;

    if (this.props.currentWorkOrder) {
      title = this.props.currentWorkOrder.title;
    }
    return (
      <Aux>
        <h1> Issue: {title}</h1>
        <button onClick={this.handleWorkOrderCompleted}>Completed</button>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentWorkOrder: state.workOrders.currentWorkOrder
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleWorkOrderCompleted: currentWorkOrderId =>
      dispatch(actions.handleWorkOrderCompleted(currentWorkOrderId))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditWorkOrder)
);
