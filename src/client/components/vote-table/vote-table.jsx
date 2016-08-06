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

  renderBetArray(array, showAvatar) {
    return <div>
      <Table className="votetable" striped condensed>
        <thead>
        <tr>
          <th className="votetable-count-header"></th>
          <th className="votetable-name"/>
          { this.props.currentPlayer ? <th className="votetable-player">
            <OverlayTrigger placement="top"
                            overlay={<Tooltip id="tooltip">You</Tooltip>}>
              <img className="votetable-avatar votetable-avatar-loggedin"
                   src={this.props.currentPlayer.profile.photo || "/asset/avatar50px.jpg"} />
            </OverlayTrigger>
          </th> : null }
          { this.props.players.map(player => <th key={player._id} className="votetable-player">
              <OverlayTrigger placement="top"
                              overlay={<Tooltip id="tooltip">{player.profile.name}</Tooltip>}>
                <img className="votetable-avatar"
                     src={player.profile.photo || "/asset/avatar50px.jpg"} />
              </OverlayTrigger>
            </th>) }
        </tr>
        </thead>
        <tbody>
        { array.map(bet =>
            <VoteTableRow key={bet.token} showAvatar={showAvatar} {...this.state.rows[bet.token]}/>)
        }
        </tbody>
      </Table>
    </div>;
  }

  render() {
    return <div className="main-app">
      <h2>Triple score characters</h2>
      <p>Select those who you think will die in season seven.</p>
      { this.renderBetArray(ThreePointCharacters, true)}
      <h2>Double score characters</h2>
      { this.renderBetArray(TwoPointCharacters, true)}
      <h2>Other characters</h2>
      { this.renderBetArray(OnePointCharacters, true)}
      <h2>Double score events</h2>
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
