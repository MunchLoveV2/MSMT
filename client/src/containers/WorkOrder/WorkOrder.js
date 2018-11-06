import React, { Component } from "react";
import Auxil from "../../hoc/Auxil";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import WorkOrderForm from "../../components/WorkOrderForm/WorkOrderForm";
import CameraApp from "../../components/CameraApp/CameraApp";

class WorkOrder extends Component {
  state = {
    dataUri: null
  };

  onTakePhoto = dataUri => {
    this.setState({ dataUri: dataUri });
  };

  // sends work order data to SQL via Sequelize
  // if no employee is logged in, the userID is, by default, set to nothing
  // otherwise, it grabs the userID via Redux (via mapStateToProps)

  workOrderSubmit = value => {
    let dataUri = this.state.dataUri;
    let urgent = false;
    let remind = false;
    const url = "/api/workorders";

    if (value.urgent) {
      urgent = true;
      remind = true;
    }

    const workOrderData = {
      title: value.title,
      category: value.category,
      location: value.location,
      pictureDataUri: dataUri,
      urgent: urgent,
      remind: remind,
      status: "pending"
    };

    let userID;

    if (this.props.userID) {
      userID = this.props.userID;
    }

    workOrderData.UserinfoId = userID;

    axios(url, {
      method: "POST",
      data: workOrderData
    })
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  };

  render() {
    return (
      <Auxil>
        <WorkOrderForm workOrderSubmit={this.workOrderSubmit} />
        <CameraApp onTakePhoto={this.onTakePhoto} />
      </Auxil>
    );
  }
}

const mapStateToProps = state => {
  return {
    userID: state.auth.userId
  };
};

export default withRouter(connect(mapStateToProps)(WorkOrder));
