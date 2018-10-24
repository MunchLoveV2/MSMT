import React, { Component } from "react";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";

// camera app component used to take picture of a work order (WorkOrder container)
// link to documentation for the camera component:
// https://www.npmjs.com/package/react-html5-camera-photo
class CameraApp extends Component {
  render() {
    return (
      <div className="App">
        <Camera
          onTakePhoto={dataUri => {
            this.props.onTakePhoto(dataUri);
          }}
        />
      </div>
    );
  }
}

export default CameraApp;
