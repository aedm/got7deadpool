import {Meteor} from 'meteor/meteor';
import React from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Table, Checkbox} from 'react-bootstrap';

import {Players} from '/src/collections/players.js';
import {Bets} from '/src/game/bets.js';


class _VoteTable extends React.Component {
  handleToggle(betToken) {
    Meteor.call("player/bet", betToken, !_.contains(this.props.currentPlayer.votes, betToken));
  }

  render() {
    let isLoggedIn = !!this.props.user;
    return <div>
      <Table bordered condensed hover style={{width: "auto"}}>
        <thead>
        <tr>
          <th>#votes</th>
          <th>Name</th>
          { isLoggedIn ? <th>You</th> : null }
          { this.props.players.map(player => <th key={player._id}>{player.profile.name}</th>) }
        </tr>
        </thead>
        <tbody>
        { Object.keys(Bets).map(key => {
          let bet = Bets[key];
          return <tr key={key}>
            <td>{key}</td>
            <td>{bet.name}</td>
            { this.props.currentPlayer ? <td>
              <Checkbox checked={_.contains(this.props.currentPlayer.votes, key)}
                        onChange={() => this.handleToggle(key)}/>
            </td> : null }
            { this.props.players.map(player => <td key={player._id}>
              <Checkbox disabled checked={_.contains(player.votes, key)}/>
            </td>)}
          </tr>
        })}
        </tbody>
      </Table>
    </div>;
  }
}

_VoteTable.propTypes = {
  userId: React.PropTypes.string,
  players: React.PropTypes.array,
  currentPlayer: React.PropTypes.object,
};

export const VoteTable = createContainer(() => {
  Meteor.subscribe("player/sub/players-latest");
  let userId = Meteor.userId();
  let playerSelector = userId ? {_id : {$ne: userId}} : {};
  return {
    user: Meteor.user(),
    players: Players.find(playerSelector, {sort: {registrationTime: -1}}).fetch(),
    currentPlayer: userId ? Players.findOne(userId) : null,
  };
}, _VoteTable);
