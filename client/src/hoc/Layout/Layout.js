import React, { Component } from "react";
import Aux from "../Aux";
import Sidebar from "../../components/SideBar/SideBar.js";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Layout extends Component {
  render() {
    return (
      <Aux>
        <Sidebar />
        <main>{this.props.children}</main>
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
