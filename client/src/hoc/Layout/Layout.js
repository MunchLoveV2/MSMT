import React, { Component } from "react";
import Aux from "../Aux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Layout extends Component {
  render() {
    return (
      <Aux>
        <div>{this.props.children}</div>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.password !== null
  };
};

export default withRouter(connect(mapStateToProps)(Layout));
