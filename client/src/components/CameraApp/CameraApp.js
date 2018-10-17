import React, { Component } from 'react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
 
class CameraApp extends Component {
 
  render () {
    return (
      <div className="App">
        <Camera
          onTakePhoto = { (dataUri) => { this.props.onTakePhoto(dataUri); } }
        />
      </div>
    );
  }
}
 
export default CameraApp;