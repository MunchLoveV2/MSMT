import React from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

let NavBar = props => {
  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">MSMT</NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem>
            {props.isAuth ? (
              <Link to="/chat">
                <NavLink>Chat</NavLink>
              </Link>
            ) : null}
          </NavItem>
          <NavItem>
            {props.isAuth ? (
              <Link to="/" onClick={props.authLogout}>
                <NavLink>Logout</NavLink>
              </Link>
            ) : null}
          </NavItem>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Options
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>Option 1</DropdownItem>
              <DropdownItem>Option 2</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Navbar>
    </div>
  );
};

export default NavBar;
