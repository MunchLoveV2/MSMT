import React from "react";
import { Navbar, Nav, NavItem, Button, Glyphicon } from "react-bootstrap";

class SideBar extends React.Component {
  //   render() {
  //     let MSMTButton
  //     let createWorkOrderButton;
  //     let profileButton;
  //     let dashboardButton;
  //     let chatButton;
  //     let feedbackButton;
  //     let seeAllWorkOrdersButton;
  //     let staffButton;
  //     let reportsButton;
  //     if (this.props.userType === "ADMIN") {
  // createWorkOrderButton = (
  //   <button onClick={this.props.history.replace("/create")}/>
  //         );
  //             otherbuttons= ();
  //     if (this.props.userType === "SUPERVISOR") {

  constructor(props) {
    super(props);

    this.state = {
      isVisible: false
    };
  }

  updateModal(isVisible) {
    this.state.isVisible = isVisible;
    this.forceUpdate();
  }

  render() {
    return (
      <div>
        <Button bsStyle="primary" onClick={() => this.updateModal(true)}>
          <Glyphicon glyph="menu-hamburger" />
        </Button>
        <Navbar
          side="left"
          isVisible={this.state.isVisible}
          onHide={() => this.updateModal(false)}
        >
          <Nav>
            <NavItem href="#">Link 1</NavItem>
            <NavItem href="#">Link 2</NavItem>
            <NavItem href="#">Link 3</NavItem>
            <NavItem href="#">Link 4</NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}
export default SideBar;
