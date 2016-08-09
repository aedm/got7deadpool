import React from 'react';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import {createContainer} from 'meteor/react-meteor-data';


export const Header = createContainer(() => {
  return {
    user: Meteor.user(),
    page: FlowRouter.current(),
  };
}, function ({user, page}) {
  let activePage = 1;
  switch (page) {
    case "about":
      activePage = 2;
      break;
    case "points":
      activePage = 3;
      break;
  }
  return <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        GoT S07 Death Pool
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav activeKey={activePage}>
        <NavItem eventKey={1} href="/">Votes</NavItem>
        <NavItem eventKey={2} href="#">Points</NavItem>
        <NavItem eventKey={3} href="#">About</NavItem>
      </Nav>
      <Nav pullRight>
        { !user ? null :
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
