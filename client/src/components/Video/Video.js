import React, { Component } from "react";
import "./Video.css";

class Video extends Component {
    render() {
      return (
        <div classname="video">
            <video autoplay muted loop id="myVideo">
                <source src="./hotel.mp4" type="video/mp4">
            </video>
        </div>
      );
    }
  }
  
  export default Video;
  
