import {Meteor} from 'meteor/meteor';
import React from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Table, Checkbox} from 'react-bootstrap';

import {Players} from '/src/collections/players.js';
import {OnePointCharacters, TwoPointCharacters, ThreePointCharacters, TwoPointEvents} from '/src/game/bets.js';


class _VoteTable extends React.Component {
  handleToggle(betToken) {
    Meteor.call("player/bet", betToken, !_.contains(this.props.currentPlayer.votes, betToken));
  }

  renderBetArray(array) {
    let isLoggedIn = !!this.props.user;
    return <div>
      <Table striped bordered condensed hover style={{width: "auto"}}>
        <thead>
        <tr>
          <th className="votetable-name"></th>
          { isLoggedIn ? <th>You</th> : null }
          { this.props.players.map(player => <th key={player._id}>{player.profile.name}</th>) }
        </tr>
        </thead>
        <tbody>
        { array.map(bet => {
          return <tr key={bet.token}>
            <td className="votetable-name">{bet.name}</td>
            { this.props.currentPlayer ? <td>
              <Checkbox checked={_.contains(this.props.currentPlayer.votes, bet.token)}
                        onChange={() => this.handleToggle(bet.token)}/>
            </td> : null }
            { this.props.players.map(player => <td key={player._id}>
              <Checkbox disabled checked={_.contains(player.votes, bet.token)}/>
            </td>)}
          </tr>
        })}
        </tbody>
      </Table>
    </div>;
  }

  render() {
    return <div>
      <h2>3-point characters</h2>
      { this.renderBetArray(ThreePointCharacters)}
      <h2>2-point characters</h2>
      { this.renderBetArray(TwoPointCharacters)}
      <h2>1-point characters</h2>
      { this.renderBetArray(OnePointCharacters)}
      <h2>2-point events</h2>
      { this.renderBetArray(TwoPointEvents)}
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
