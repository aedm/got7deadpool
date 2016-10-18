import {Meteor} from 'meteor/meteor';
import React from 'react';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';

import {CustomCheckbox} from '/src/client/components/custom-checkbox/custom-checkbox.jsx';


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

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.vote !== this.state.vote
        || nextProps.voteCount != this.props.voteCount
        || !_.isEqual(nextProps.votes, this.props.votes)) return true;

    // TODO: this is bug, but if the max vote changes, updating everyting is really slow. See #7
    // if (nextProps.maxVoteCount != this.props.maxVoteCount) return true;

    return false;
  }

  handleToggle() {
    let newState = !this.state.vote;
    this.setState({vote: newState});

    setTimeout(() => Meteor.call("player/bet", this.props.bet.token, newState), 0);
  }

  // Generates background color for the "sum" cell
  getBackgroundColor() {
    let ratio = this.props.voteCount / this.props.maxVoteCount;
    // 120 is green, 0 is red
    let hue = 120 * (1 - ratio);
    let saturation = 0 + 100 * ratio;
    let lightness = 30 + 30 * ratio;
    return `hsl(${hue},${saturation}%,${lightness}%)`;
  }

  renderFriendsList() {
    if (!this.props.player) return null;

    let vote = this.props.player.vote;

    return <td className="votetable-friend-cell">
      <div className="votetable-friends-list">
        <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip">You</Tooltip>}>
          <img className={`votetable-avatar votetable-avatar-self ${vote ? "votetable-voted" : ""}`}
               style={{zIndex: this.props.votingPlayers.length + 1}}
               src={this.props.user.profile.photo || "/asset/avatar50px.jpg"}/>
        </OverlayTrigger>
        { this.props.votingPlayers.map((player, index) =>
            <OverlayTrigger key={index} placement="top"
                            overlay={<Tooltip id="tooltip">{player.profile.name}</Tooltip>}>
              <img className="votetable-avatar"
                   style={{zIndex: `${this.props.votingPlayers.length - index}`}}
                   src={player.profile.photo || "/asset/avatar50px.jpg"}/>
            </OverlayTrigger>)}
      </div>
    </td>;
  }

  render() {
    let voteCell = null;
    if (this.props.voteCount >= 0) {
      let background = this.getBackgroundColor();
      voteCell = <td className="votetable-count">
        <div className="votetable-count-label" style={{"backgroundColor": background}}>
          {this.props.voteCount}
        </div>
      </td>;
    } else {
      voteCell = <td className="votetable-count"/>;
    }

    let playerCell = null;
    if (this.props.player) {
      playerCell = <td className="votetable-checkbox-cell">
        <CustomCheckbox checked={this.state.vote} onChange={() => this.handleToggle()}/>
      </td>;
    }

    let avatar = null;
    if (this.props.showAvatar) {
      avatar = <img className="votetable-character-avatar"
                    src={`/characters/${this.props.bet.token}.jpg`}/>
    }

    return <tr key={this.props.token}>
      { voteCell }
      <td className="votetable-name-cell">
        <div className="votetable-name-flexhack">
          { avatar }
          <div className="votetable-name">{this.props.bet.name}</div>
        </div>
      </td>
      { playerCell }
      { this.renderFriendsList() }
    </tr>;
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
