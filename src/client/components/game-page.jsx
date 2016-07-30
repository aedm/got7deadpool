import React from 'react';
import ReactDOM from 'react-dom';
import {createContainer} from 'meteor/react-meteor-data';
import {Panel, FormControl, FormGroup, Button} from 'react-bootstrap';
import {Accounts} from 'meteor/accounts-base';

import {VoteTable} from '/src/client/components/vote-table/vote-table.jsx';
import {Bets} from '/src/game/bets.js';


export class _GamePage extends React.Component {
  constructor() {
    super();
    this.players = [];
    for (let i = 0; i < 10; i++) {
      let vote = {};
      for (let key of Object.keys(Bets)) {
        if (Math.random() > 0.5) vote[key] = true;
      }
      this.players.push({
        name: i.toString(),
        votes: vote,
      });
    }
  }

  handleLogin(event) {
    event.preventDefault();
    let username = ReactDOM.findDOMNode(this.refs["username"]).value;
    Accounts.createUser({username, password: "almafa123"}, (err) => {
      Meteor.loginWithPassword(username, "almafa123");
    });
  }

  renderLoginButton() {
    if (this.props.user) {
      return <Button bsStyle="primary" onClick={() => Meteor.logout()}>
        Log out "{this.props.user.username}"
      </Button>
    } else {
      return <form onSubmit={this.handleLogin.bind(this)}>
        <FormControl ref="username" type="text" placeholder="login with username"/>
      </form>;
    }
  }

  render() {
    return <div className="container">
      { this.renderLoginButton() }
      <VoteTable players={this.players}/>
    </div>;
  }
}

_GamePage.propTypes = {
  user: React.PropTypes.object,
};

export const GamePage = createContainer(() => {
  return {
    user: Meteor.user(),
  };
}, _GamePage);
