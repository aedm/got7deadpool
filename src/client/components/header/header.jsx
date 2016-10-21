import React from 'react';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import {createContainer} from 'meteor/react-meteor-data';

import {Helpers} from '/src/client/helpers.js';


export const Header = createContainer(() => {
  return {
    user: Meteor.user(),
  };
}, function ({user, selectedHeaderPage}) {
  let activePage = 1;
  switch (selectedHeaderPage) {
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
  return <Navbar>
    <Navbar.Header>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav activeKey={activePage}>
        <NavItem eventKey={1} href="/">Votes</NavItem>
        { !user ? null : <NavItem eventKey={2} href="/results">Results</NavItem> }
        <NavItem eventKey={3} href="/rules">Rules</NavItem>
        <NavItem eventKey={4} href="/about">About</NavItem>
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
