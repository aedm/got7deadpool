import React from 'react';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';

import {GamePage} from '/src/client/components/game-page/game-page.jsx';
import {WelcomeScreen} from '/src/client/components/welcome-screen/welcome-screen.jsx';
import {Header} from '/src/client/components/header/header.jsx';

export class App extends React.Component {
  render() {
    return <div>
      <WelcomeScreen />
      <Header />
      <GamePage />
    </div>;
  }
}
