import {Meteor} from 'meteor/meteor';
import React from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Table, Checkbox} from 'react-bootstrap';

import {Players} from '/src/collections/players.js';
import {
    OnePointCharacters,
    TwoPointCharacters,
    ThreePointCharacters,
    TwoPointEvents
} from '/src/game/bets.js';
import {Configuration} from '/src/collections/configuration.js';


class _VoteTable extends React.Component {
  handleToggle(betToken) {
    Meteor.call("player/bet", betToken, !_.contains(this.props.currentPlayer.votes, betToken));
  }

  // Generates background color for the "sum" cell
  getBackgroundColor(voteCount) {
    let ratio = voteCount / this.props.maxVoteCount;
    // 120 is green, 0 is red
    let hue = 120 * (1-ratio);
    let saturation = 60 + 30 * ratio;
    return `hsl(${hue},${saturation}%,90%)`;
  }

  renderBetArray(array) {
    let isLoggedIn = !!this.props.user;
    return <div>
      <Table striped bordered condensed hover style={{width: "auto"}}>
        <thead>
        <tr>
          <th className="votetable-count-header">sum</th>
          <th className="votetable-name"/>
          { isLoggedIn ? <th>You</th> : null }
          { this.props.players.map(player => <th key={player._id}>{player.profile.name}</th>) }
        </tr>
        </thead>
        <tbody>
        { array.map(bet => {

          let voteCell = null;
          if (this.props.voteCounts) {
            let count = this.props.voteCounts[bet.token];
            let background = this.getBackgroundColor(count);
            voteCell = <td className="votetable-count" style={{"backgroundColor": background}}>
              {count}
            </td>;
          } else {
            voteCell = <td className="votetable-count"/>;
          }

          return <tr key={bet.token}>
            { voteCell }
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
  let playerSelector = userId ? {_id: {$ne: userId}} : {};
  let voteCounts = Configuration.findOne("votecount");

  // Calculate the maximum number of votes
  let maxVoteCount = 1;
  if (voteCounts) {
    _.forEach(voteCounts, count => {
      if (count > maxVoteCount) maxVoteCount = count;
    });
  }

  return {
    user: Meteor.user(),
    players: Players.find(playerSelector, {sort: {registrationTime: -1}}).fetch(),
    currentPlayer: userId ? Players.findOne(userId) : null,
    voteCounts,
    maxVoteCount,
  };
}, _VoteTable);
