import React, { Component } from "react";
import Switch from "react-switch";

class AlertToggle extends Component {
  render() {
    return (
      <label htmlFor="normal-switch">
        <span>Send a text?</span>
        <Switch
          onChange={this.props.handleIsAlert}
          checked={this.props.isAlert}
          id="normal-switch"
        />
      </label>
    );
  }
}

export default AlertToggle;
