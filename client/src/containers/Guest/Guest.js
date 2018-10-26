import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import GuestAuth from "../../components/GuestAuth/GuestAuth";

class Guest extends Component {
  // for now, just redirects a guest to the work order page
  guestAuthClick = values => {
    this.props.history.replace("/create/");
  };

  render() {
    return (
      <Aux>
        <GuestAuth guestAuthClick={this.guestAuthClick} />
      </Aux>
    );
  }
}

export default Guest;
