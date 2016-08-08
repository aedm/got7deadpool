import React from 'react';
import {Button} from 'react-bootstrap';

export class WelcomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {visible: false};
  }

  render() {
    if (!this.state.visible) return null;
    return <div className="welcome-screen">
      <div className="container text-center">
        <h1>Game of Thrones Season 7 Death Lottery</h1>
        <p>This is a non-public alpha version.<br/>
          Database might get wiped.<br/>
          Spoilers everywhere.</p>

        <Button bsStyle="primary" onClick={() => this.setState({visible: false})}>
          I've seen season 6, let me in
        </Button>
      </div>
    </div>;
  }
}

