import {Meteor} from 'meteor/meteor';
import React from 'react';

import {CountLabel} from '/src/client/components/vote-table/count-label.jsx';
import {FriendsList} from '/src/client/components/vote-table/friends-list.jsx';
import {ShowBet} from '/src/client/components/vote-table/show-bet.jsx';


export class VoteTableRow extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.voteCount !== this.props.voteCount ||
        nextProps.maxVoteCount !== this.props.maxVoteCount ||
        nextProps.player.vote !== this.props.player.vote ||
        nextProps.votingPlayers.length !== this.props.votingPlayers.length ||
        !nextProps.votingPlayers.every((x, i) => x === this.props.votingPlayers[i]);
  }

  handleToggle(newVote) {
    setTimeout(() => Meteor.call("player/bet", this.props.bet.token, newVote), 0);
  }

  render() {
    return <div className="votetable-vote" key={this.props.token}>
      { !this.props.player ? null :
          <FriendsList player={this.props.player} votingPlayers={this.props.votingPlayers}
                       user={this.props.user}/> }
      <div className="votetable-row">
        <CountLabel voteCount={this.props.voteCount} maxVoteCount={this.props.maxVoteCount}/>
        <ShowBet handleToggle={this.handleToggle.bind(this)} bet={this.props.bet}
                 player={this.props.player} showAvatar={this.props.showAvatar}/>
      </div>
    </div>;
  }
}


VoteTableRow.propTypes = {
  // The bet of this row
  bet: React.PropTypes.object,

  // Current player
  player: React.PropTypes.shape({
    vote: React.PropTypes.bool.isRequired,
  }),

  // Other players votes
  votingPlayers: React.PropTypes.arrayOf(React.PropTypes.object),

  // Sum of all counts for this bet
  voteCount: React.PropTypes.number,

  // The number of votes on the most popular bet
  maxVoteCount: React.PropTypes.number,

  // Should show avatar
  showAvatar: React.PropTypes.bool,
};
