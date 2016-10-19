import React from 'react';

import {WelcomeScreen} from '/src/client/pages/welcome-screen/welcome-screen.jsx';
import {Header} from '/src/client/components/header/header.jsx';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {welcomeScreen: true};
  }

  render() {
    if (this.state.welcomeScreen) {
      return <WelcomeScreen onClose={() => this.setState({welcomeScreen: false}) }/>;
    }

    return <div>
      <Header selectedHeaderPage={this.props.selectedHeaderPage} />
      <div className="game-title">Season 7 Death Pool</div>
      { this.props.content() }
    </div>;
  }
}

App.propTypes = {
  content: React.PropTypes.func.isRequired,
};

