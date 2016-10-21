import React from 'react';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import {createContainer} from 'meteor/react-meteor-data';

import {Helpers} from '/src/client/helpers.js';

class Header_ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownToggled: false,
    }
  }

  toggleDropdown() {
    this.setState({dropdownToggled: !this.state.dropdownToggled});
  }

  render() {
    let activePage = 1;
    switch (this.props.selectedHeaderPage) {
      case "results":
        activePage = 2;
        break;
      case "rules":
        activePage = 3;
        break;
      case "about":
        activePage = 4;
        break;
    }
    return <Navbar expanded={this.state.dropdownToggled} onToggle={() => this.toggleDropdown()}>
      <Navbar.Header>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav activeKey={activePage}>
          <NavItem eventKey={1} href="/" onClick={() => this.toggleDropdown()}>Votes</NavItem>
          { !this.props.user ? null :
              <NavItem eventKey={2} href="/results" onClick={() => this.toggleDropdown()}>
                Results
              </NavItem> }
          <NavItem eventKey={3} href="/rules" onClick={() => this.toggleDropdown()}>Rules</NavItem>
          <NavItem eventKey={4} href="/about" onClick={() => this.toggleDropdown()}>About</NavItem>
        </Nav>
        <Nav pullRight>
          { !this.props.user ?
              <NavItem onClick={() => {Helpers.facebookLogin();  this.toggleDropdown();}}>
                Log in
              </NavItem>
              :
              <NavItem onClick={() => {Meteor.logout(); this.toggleDropdown();}}>
                <img className="header-photo"
                     src={this.props.user.profile.photo || "/asset/avatar50px.jpg"}/>
                Log out
              </NavItem>
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>;
  }
}


export const Header = createContainer(() => {
  return {
    user: Meteor.user(),
  };
}, Header_);

Header.propTypes = {
  selectedHeaderPage: React.PropTypes.string,
};
