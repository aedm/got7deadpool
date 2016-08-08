import React from 'react';
import {Jumbotron} from 'react-bootstrap';

import {GamePage} from '/src/client/components/game-page.jsx';
import {WelcomeScreen} from '/src/client/components/welcome-screen/welcome-screen.jsx';

export class App extends React.Component {
  render() {
    return <div>
      <WelcomeScreen />
      <GamePage />
    </div>;
  }
}
