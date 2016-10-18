import React from 'react';

import {GamePage} from '/src/client/components/game-page/game-page.jsx';
import {WelcomeScreen} from '/src/client/components/welcome-screen/welcome-screen.jsx';
import {Header} from '/src/client/components/header/header.jsx';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {welcomeScreen: false};
  }

  render() {
    if (this.state.welcomeScreen) {
      return <WelcomeScreen onClose={() => this.setState({welcomeScreen: false}) }/>;
    }

    return <div>
      <Header />
      <GamePage />
    </div>;
  }
}
