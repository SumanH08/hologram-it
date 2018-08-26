import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";

class NavMenu extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <Navbar color="dark" light expand="md">
        <NavbarBrand style={{ color: "#eeeeee" }} href="/">
          OHMYHOLO
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink style={{ color: "#eeeeee" }} href="/new">
                New Hologram
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink style={{ color: "#eeeeee" }} href="/view">
                Gallery
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink style={{ color: "#eeeeee" }} href="/logout">
                Logout
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default NavMenu;
