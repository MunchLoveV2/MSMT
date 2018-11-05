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
import { Link } from 'react-router-dom';

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
              <NavLink href="/" onClick={props.authLogout}>
                Logout
              </NavLink>
            ) : null}
          </NavItem>
          <NavItem>
            {props.userType === "ADMIN" ? (
              <Link to="signup">
                <NavLink>Create User</NavLink>
              </Link>
            ) : null}
          </NavItem>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Work Orders
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                {props.isAuth ? (
                  <Link to="/create">Create Work Order</Link>
                ) : null}
              </DropdownItem>
              <DropdownItem>
                {props.userType === "ADMIN" ? (
                  <Link to="/workorders">See All Work Orders</Link>
                ) : null}
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Navbar>
    </div>
  );
};

export default NavBar;
