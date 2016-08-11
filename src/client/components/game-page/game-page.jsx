import React from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Button, Table} from 'react-bootstrap';

import {VoteTable} from '/src/client/components/vote-table/vote-table.jsx';
import {Helpers} from '/src/client/helpers.js';

export class _GamePage extends React.Component {
  renderLoginButton() {
    if (this.props.isLoggingIn) {
      return <Button disabled>
        Logging in...
      </Button>;
    }
    else if (!this.props.user) {
      return <div className="login-button text-center">
        <Button bsStyle="primary" onClick={() => Helpers.facebookLogin()}>
          Log in with Facebook to participate
        </Button>
      </div>;
    }
  }

  renderRules() {
    return <div className="container">
      <div className="row rules row-eq-height">
        <div className="text-center col-md-5 col-md-offset-1">
          <div>
            <h2>What's this game about?</h2>
            <p>Predict who dies in season 7 of Game of Thrones
              and compete against others.</p>
            <p>Voting is closed right before the season starts. Scores get updated after each
              episode. Your predictions are public.</p>
            <p>It's for free and you can't win anything.</p>
            <p>This is a fan-made website, I have no affiliation with HBO, everything here is the
              property of their respective owners.</p>
          </div>
        </div>
        <div className="text-center col-md-5">
          <div>
            <h2>Scoring</h2>
            <p>Scores in this chart will get multiplied by the value of each character.</p>
            <Table className="rule-table">
              <tbody>
              <tr>
                <td className="rules-empty"/>
                <td colSpan="2">Your prediction</td>
              </tr>
              <tr>
                <td className="rules-empty"/>
                <td>Dies</td>
                <td>Survives</td>
              </tr>
              <tr>
                <td>Dies in the show</td>
                <td>2</td>
                <td>-1</td>
              </tr>
              <tr>
                <td>Survives in the show</td>
                <td>0</td>
                <td>1</td>
              </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>;
  }

  render() {
    return <div>
      <div className="game-title">Season 7 Death Pool</div>
      { this.renderRules() }
      <div className="login">
        { this.renderLoginButton() }
      </div>
      <VoteTable/>
    </div>;
  }
}

_GamePage.propTypes = {
  user: React.PropTypes.object,
};

export const GamePage = createContainer(() => {
  return {
    user: Meteor.user(),
    isLoggingIn: Meteor.loggingIn(),
  };
}, _GamePage);
