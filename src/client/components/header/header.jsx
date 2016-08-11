import React from 'react';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import {createContainer} from 'meteor/react-meteor-data';

import {Helpers} from '/src/client/helpers.js';


export const Header = createContainer(() => {
  return {
    user: Meteor.user(),
    page: FlowRouter.current(),
  };
}, function ({user, page}) {
  let activePage = 1;
  switch (page) {
    case "points":
      activePage = 2;
      break;
    case "rules":
      activePage = 3;
      break;
    case "about":
      activePage = 4;
      break;
  }
  return <Navbar>
    <Navbar.Header>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav activeKey={activePage}>
        <NavItem eventKey={1} href="/">Votes</NavItem>
        <NavItem eventKey={2} href="#">Points</NavItem>
        <NavItem eventKey={3} href="#">Rules</NavItem>
        <NavItem eventKey={4} href="#">About</NavItem>
      </Nav>
      <Nav pullRight>
        { !user ?
            <NavItem onClick={() => Helpers.facebookLogin()}>
              Log in
            </NavItem>
            :
            <NavItem onClick={() => Meteor.logout()}>
              <img className="header-photo"
                   src={user.profile.photo || "/asset/avatar50px.jpg"}/>
              Log out
            </NavItem>
        }
      </Nav>
    </Navbar.Collapse>
  </Navbar>;
});
