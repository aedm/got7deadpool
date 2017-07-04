import {Meteor} from "meteor/meteor";
import React from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Form, Col, Button, FormGroup, FormControl, ControlLabel, Alert} from 'react-bootstrap';

import {Logger} from "/src/lib/logger.js";
import {SubmitWithState} from "/src/lib/submit.js";
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
    this.state = {
      validationErrors: {},
    };
  }

  submit() {
    let hasErrors = false;
    let episode = this.episode.value;
    if (!/^\d+$/.test(episode)) {
      Logger.error("bad episode number");
      return;
    }
    episode = parseInt(episode);

    let deadpool = {};
    Object.keys(Bets).forEach(token => {
      let value = this[`token_${token}`].value;
      if (value) {
        if (!/^\d+$/.test(value)) {
          Logger.error(`"${Bets[token].name}" has invalid value`);
          hasErrors = true;
          return;
        }
        deadpool[token] = parseInt(value);
      }
    });
    if (hasErrors) {
      this.setState({isSubmitted: true, submitErrorMessage: "Error, see debug logs"});
      return;
    }

    Logger.debug("episode", episode);
    Logger.debug("deadpool", deadpool);
    SubmitWithState(this, "admin/updateGameState", {episode, deadpool});
  }

  renderBetArray(array) {
    return array.map(bet => {
        let value = this.props.gameProgress.deadPool[bet.token];
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

  renderServerMessage() {
    if (!this.state.isSubmitted) return null;
    let isError = !!this.state.submitErrorMessage;
    let msg = isError ? `Server error: "${this.state.submitErrorMessage}"` : "Submitted";
    return <Alert bsStyle={isError ? "danger" : "info"} closeLabel="Whatever"
                  onDismiss={() => this.setState({isSubmitted: false}) }>
      {msg}
    </Alert>;
  }

  render() {
    return <div className="container">
      <div className="game-page admin-page">
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

          { this.renderServerMessage() }

          { !this.state.isSubmitting ?
            <Button bsStyle="danger" onClick={() => this.submit()}>
              Save and calculate scores
            </Button>
            :
            <Button bsStyle="danger" disabled>Patience is a virtue</Button>
          }

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
