import React from 'react';
import {Button} from 'react-bootstrap';

export class WelcomeScreen extends React.Component {
  render() {
    return <div className="welcome-screen">
      <div className="container text-center">
        <h1>Game of Thrones<br/>
          Season 7 Death Pool</h1>
        <p>This is a game. Predict the deaths of season 7 and compete against others.</p>
        <p>Spoilers everywhere.</p>

        <Button bsStyle="danger" onClick={() => this.props.onClose()}>
          I've seen season 6, let me in
        </Button>
      </div>
    </div>;
  }
}

