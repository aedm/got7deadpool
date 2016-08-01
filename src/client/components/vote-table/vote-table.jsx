import {Meteor} from 'meteor/meteor';
import React from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Table} from 'react-bootstrap';

import {Players} from '/src/collections/players.js';
import {
    OnePointCharacters,
    TwoPointCharacters,
    ThreePointCharacters,
    TwoPointEvents,
    Bets
} from '/src/game/bets.js';
import {AppState} from '/src/collections/app-state.js';
import {VoteTableRow} from '/src/client/components/vote-table/vote-table-row.jsx';

class _VoteTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.processProps(props);
  }

  componentWillReceiveProps(newProps) {
    this.setState(this.processProps(newProps));
  }

  processProps(props) {
    let rows = {};
    let hasPlayer = !!props.currentPlayer;
    let playerCount = props.players ? props.players.length : 0;

    let maxVoteCount = 1;
    if (props.voteCounts) {
      _.each(props.voteCounts, count => {
        if (count>maxVoteCount) maxVoteCount = count;
      });
    }

    // Create rows with empty data, false everywhere
    _.each(Bets, bet => {
      rows[bet.token] = {
        bet,
        player: hasPlayer ? { vote: false } : null,
        votes: _.map(_.range(playerCount), () => false),
        voteCount: props.voteCounts ? props.voteCounts[bet.token] : -1,
        maxVoteCount,
      };
    });

    // Fill rows with players votes
    if (hasPlayer) {
      props.currentPlayer.votes.forEach(token => rows[token].player.vote = true);
    }

    // Fill in rows with other players votes
    if (props.players) {
      props.players.forEach((player, index) => {
        player.votes.forEach(token => rows[token].votes[index] = true);
      });
    }

    return { rows };
  }

  renderBetArray(array) {
    return <div>
      <Table striped bordered condensed hover style={{width: "auto"}}>
        <thead>
        <tr>
          <th className="votetable-count-header">sum</th>
          <th className="votetable-name"/>
          { this.props.currentPlayer ? <th>You</th> : null }
          { this.props.players.map(player => <th key={player._id}>{player.profile.name}</th>) }
        </tr>
        </thead>
        <tbody>
        { array.map(bet => <VoteTableRow key={bet.token} {...this.state.rows[bet.token]}/>) }
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
  voteCounts: React.PropTypes.object,
};

export const VoteTable = createContainer(() => {
  Meteor.subscribe("player/sub/players-latest");
  let userId = Meteor.userId();
  let playerSelector = userId ? {_id: {$ne: userId}} : {};
  let voteCounts = AppState.findOne("votecount");

  return {
    user: Meteor.user(),
    players: Players.find(playerSelector, {sort: {registrationTime: -1}}).fetch(),
    currentPlayer: userId ? Players.findOne(userId) : null,
    voteCounts,
  };
}, _VoteTable);
