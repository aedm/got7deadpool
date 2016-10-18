import {Meteor} from 'meteor/meteor';
import React from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Table, OverlayTrigger, Tooltip} from 'react-bootstrap';

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

    let maxVoteCount = 1;
    if (props.voteCounts) {
      _.each(props.voteCounts, count => {
        if (count > maxVoteCount) maxVoteCount = count;
      });
    }

    // Create rows with empty data, false everywhere
    _.each(Bets, bet => {
      rows[bet.token] = {
        bet,
        player: hasPlayer ? {vote: false} : null,
        votingPlayers: [],
        voteCount: props.voteCounts ? props.voteCounts[bet.token] : -1,
        maxVoteCount,
      };
    });

    // Fill rows with players votes
    if (hasPlayer) {
      props.currentPlayer.votes.forEach(token => {
        let row = rows[token];
        if (row) {
          row.player.vote = true;
          row.votingPlayers.push(props.currentPlayer);
        }
      });
    }

    // Fill in rows with other players votes
    if (props.players) {
      props.players.forEach((player, index) => {
        player.votes.forEach(token => {
          let row = rows[token];
          if (row) row.votingPlayers.push(player);
        });
      });
    }

    return {rows};
  }

  renderBetArray(array, showAvatar) {
    return <div>
      <Table className="votetable" striped>
        <tbody>
        { array.map(bet =>
            <VoteTableRow key={bet.token} showAvatar={showAvatar} {...this.state.rows[bet.token]}/>)
        }
        </tbody>
      </Table>
    </div>;
  }

  renderReadOnlyTable() {
    return <div className="container">
      <div className="row">
        <div className="table-container col-md-4">
          <h2>Triple score</h2>
          { this.renderBetArray(ThreePointCharacters, true)}
        </div>
        <div className="table-container col-md-4">
          <h2>Double score</h2>
          { this.renderBetArray(TwoPointCharacters, true)}
        </div>
        <div className="table-container col-md-4">
          <h2>Others</h2>
          { this.renderBetArray(OnePointCharacters, true)}
        </div>
      </div>
      <div className="table-container">
        <h2>Double score events</h2>
        { this.renderBetArray(TwoPointEvents)}
      </div>
    </div>;
  }

  renderPlayerTable() {
    return <div className="table-container">
      <h2>Triple score characters</h2>
      { this.renderBetArray(ThreePointCharacters, true)}
      <h2>Double score characters</h2>
      { this.renderBetArray(TwoPointCharacters, true)}
      <h2>Other characters</h2>
      { this.renderBetArray(OnePointCharacters, true)}
      <h2>Double score events</h2>
      { this.renderBetArray(TwoPointEvents)}
    </div>;
  }

  render() {
    return this.props.currentPlayer ? this.renderPlayerTable() : this.renderReadOnlyTable();
  }
}

_VoteTable.propTypes = {
  userId: React.PropTypes.string,
  players: React.PropTypes.array,
  currentPlayer: React.PropTypes.object,
  voteCounts: React.PropTypes.object,
};

export const VoteTable = createContainer(() => {
  Meteor.subscribe("player/sub/friends");
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
