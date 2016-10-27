import React from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Button} from 'react-bootstrap';

import {VoteTable} from '/src/client/components/vote-table/vote-table.jsx';
import {Helpers} from '/src/client/helpers.js';
import {RuleTable} from '/src/client/components/vote-table/rule-table.jsx';

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
      <div className="gameinfo">
        <div className="gameinfo-box">
          <h2>What's this game about?</h2>
          <p>Predict who dies in season 7 of Game of Thrones
            and compete against others.</p>
          <p>Voting is closed right before the season starts. Scores get updated after each
            episode. Your predictions are public.</p>
          <p>It's for free and you can't win anything.</p>
          <p>This is a fan-made website, I have no affiliation with HBO, everything here is the
            property of their respective owners.</p>
        </div>
        <div className="gameinfo-box">
          <h2>Scoring</h2>
          <p>You'll get points for your predictions, depending on what actually happens in the show.
            See some <a href="/rules">examples</a>.</p>
          <RuleTable />
        </div>
      </div>
    </div>;
  }

  render() {
    return <div>
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
