import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ProgressBar from "../../components/ProgressBar/ProgressBar.js";

class WorkOrderSuccess extends Component {
  state = {
    percentage: 10
  };
  render() {
    return (
      <Aux>
        <p> Sucess! Thank you for submitting work order </p>
        <ProgressBar percentage={this.state.percentage} />
      </Aux>
    );
  }
}

export default withRouter(
  connect(
    null,
    null
  )(WorkOrderSuccess)
);
