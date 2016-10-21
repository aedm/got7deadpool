import React from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Button} from 'react-bootstrap';

import {WelcomeScreen} from '/src/client/pages/welcome-screen/welcome-screen.jsx';
import {Header} from '/src/client/components/header/header.jsx';

class App_ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {welcomeScreen: !this.props.user};
  }

  componentWillReceiveProps(newProps) {
    if (newProps.user) this.setState({welcomeScreen: false});
  }


  render() {
    if (this.props.isLoggingIn) {
      return <div className="login">
        <Button disabled>Loading...</Button>
      </div>;
    }

    if (this.state.welcomeScreen) {
      return <WelcomeScreen onClose={() => this.setState({welcomeScreen: false}) }/>;
    }

    return <div>
      <Header selectedHeaderPage={this.props.selectedHeaderPage}/>
      <div className="game-title">Season 7 Death Pool</div>
      { this.props.content() }
    </div>;
  }
}

App_.propTypes = {
  content: React.PropTypes.func.isRequired,
};

export const App = createContainer(() => {
  return {
    user: Meteor.user(),
    isLoggingIn: Meteor.loggingIn(),
  };
}, App_);