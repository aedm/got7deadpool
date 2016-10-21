import {Meteor} from 'meteor/meteor';
import React from 'react';

import {CustomCheckbox} from '/src/client/components/custom-checkbox/custom-checkbox.jsx';
import {CountLabel} from '/src/client/components/vote-table/count-label.jsx';
import {FriendsList} from '/src/client/components/vote-table/friends-list.jsx';


export class VoteTableRow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      vote: this.props.player ? this.props.player.vote : null,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      vote: nextProps.player ? nextProps.player.vote : null,
    });
  }

  handleToggle() {
    let newState = !this.state.vote;
    this.setState({vote: newState});

    setTimeout(() => Meteor.call("player/bet", this.props.bet.token, newState), 0);
  }

  render() {
    let voteCheckbox = null;
    if (this.props.player) {
      voteCheckbox = <div className="votetable-checkbox-cell">
        <CustomCheckbox checked={this.state.vote} onChange={() => this.handleToggle()}/>
      </div>;
    }

    let avatar = null;
    if (this.props.showAvatar) {
      avatar = <img className="votetable-character-avatar"
                    src={`/characters/${this.props.bet.token}.jpg`}/>
    }

    return <div className="votetable-vote" key={this.props.token}>
      { !this.props.player ? null :
          <FriendsList player={this.props.player} votingPlayers={this.props.votingPlayers}
                       user={this.props.user}/> }
      <div className="votetable-row">
        <CountLabel voteCount={this.props.voteCount} maxVoteCount={this.props.maxVoteCount}/>
        { avatar }
        <div className="votetable-name">{this.props.bet.name}</div>
        { voteCheckbox }
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
