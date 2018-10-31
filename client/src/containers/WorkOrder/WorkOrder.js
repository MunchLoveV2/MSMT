import React, { Component } from "react";
import Aux from "../../hoc/Aux";
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
    //let arrayBuffer = decode(dataUri);
    //console.log(arrayBuffer);

    // test above
    const url = "/api/workorders";

    const workOrderData = {
      title: value.title,
      category: value.category,
      location: value.location,
      pictureDataUri: dataUri,
      status: "pending"
    };

    let userID;

    if (this.props.userID) {
      userID = this.props.userID;
    }

    workOrderData.UserinfoId = userID;
    console.log(workOrderData);

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
      <Aux>
        <WorkOrderForm workOrderSubmit={this.workOrderSubmit} />
        <CameraApp onTakePhoto={this.onTakePhoto} />
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    userID: state.auth.userId
  };
};

export default withRouter(connect(mapStateToProps)(WorkOrder));
