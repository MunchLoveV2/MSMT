import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import WorkOrderForm from "../../components/WorkOrderForm/WorkOrderForm";

import CameraApp from "../../components/CameraApp/CameraApp";
import toFile from "data-uri-to-file";

// below sets up configuration for AWS S3
// we're using AWS S3 for image uploads in the Work Order
import AWS from "aws-sdk";

const myCredentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: "us-east-1:9aced621-b96e-4bf0-bcd1-b82c2d7011d0"
});

const myConfig = new AWS.Config({
  credentials: myCredentials,
  region: "us-east-1"
});

class WorkOrder extends Component {
  onTakePhoto = dataUri => {
    toFile(dataUri).then(file => {
      console.log(file.mimeType, file.data, file.extension);
    });
  };

  // sends work order data to SQL via Sequelize
  // if no employee is logged in, the userID is, by default, set to "69"
  // otherwise, it grabs the userID via Redux (via mapStateToProps)

  workOrderSubmit = value => {
    const url = "/api/workorders";

    const workOrderData = {
      title: value.title,
      category: value.category,
      location: value.location
    };

    let userID = 69;

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

  //testing file right now
  upload(e) {
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    myConfig.update({
      accessKeyId: "us-east-1",
      secretAccessKey: "qsNcA9kWa4vXZoif3rAf+eVt9eYC8t1hOdEHvL4T"
    });

    var s3 = new AWS.S3({
      params: { Bucket: "workorderpictures" }
    });

    console.log(s3);

    s3.upload(
      {
        Key: "test123",
        Body: file,
        ACL: "public-read"
      },
      function(err, data) {
        if (err) {
          return alert(
            "There was an error uploading your photo: ",
            err.message
          );
        }
        alert("Successfully uploaded photo.");
        //viewAlbum(albumName);
      }
    );
  }

  render() {
    return (
      <Aux>
        <WorkOrderForm workOrderSubmit={this.workOrderSubmit} />
        <CameraApp onTakePhoto={this.onTakePhoto} />
        <input type="file" onChange={this.upload} />
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
