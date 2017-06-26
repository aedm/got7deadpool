import React from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Form, Col, Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';

import {AppState} from '/src/collections/app-state.js';
import {
  OnePointCharacters,
  TwoPointCharacters,
  ThreePointCharacters,
  TwoPointEvents,
  Bets
} from '/src/game/bets.js';

class _AdminPage extends React.Component {
  constructor(props) {
    super(props);
  }

  submit() {
    console.log(this.episode.value);
    let deadpool = {};
    Object.keys(Bets).forEach(token => {
      let value = this[`token_${token}`].value;
      if (value) deadpool[token] = value;
    });
    console.log(deadpool);
  }

  renderBetArray(array) {
    return array.map(bet => {
        let value = this.props.gameProgress[bet.token];
        return <FormGroup key={bet.token}>
          <Col componentClass={ControlLabel} sm={6}>{bet.name}</Col>
          <Col sm={2}>
            <FormControl type="text"
                         defaultValue={value}
                         inputRef={x => this[`token_${bet.token}`] = x}/>
          </Col>
        </FormGroup>;
      }
    );
  }

  render() {
    return <div className="container">
      <div className="game-page">
        <h2>You must be this tall to die</h2>
        <Form horizontal>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={6}>Current episode</Col>
            <Col sm={2}>
              <FormControl type="text"
                           defaultValue={this.props.gameProgress.episode}
                           inputRef={x => this.episode = x}/>
            </Col>
          </FormGroup>
          <h5>Triple score</h5>
          { this.renderBetArray(ThreePointCharacters) }
          <h5>Double score</h5>
          { this.renderBetArray(TwoPointCharacters) }
          <h5>Others</h5>
          { this.renderBetArray(OnePointCharacters) }
          <h5>Events</h5>
          { this.renderBetArray(TwoPointEvents) }
          <Button bsStyle="danger" onClick={() => this.submit()}>
            Save and calculate scores
          </Button>
        </Form>
      </div>
    </div>;
  }
}

export const AdminPage = createContainer(() => {
  return {
    gameProgress: AppState.findOne("gameProgress"),
  };
}, _AdminPage);
