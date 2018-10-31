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

let NavBar = props => {
  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">MSMT</NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink>Profile</NavLink>
          </NavItem>
          <NavItem>
            {props.isAuth ? (
              <NavLink href="/" onClick={props.authLogout}>
                Logout
              </NavLink>
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
