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
        || nextProps.votingPlayers.length != this.props.votingPlayers.length
        || !nextProps.votingPlayers.every((x, i) => x === this.props.votingPlayers[i])) return true;

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

    return <div className="votetable-friends-list">
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
    </div>;
  }

  render() {
    let voteCount = null;
    if (this.props.voteCount >= 0) {
      let background = this.getBackgroundColor();
      voteCount = <div className="votetable-count">
        <div className="votetable-count-label" style={{"backgroundColor": background}}>
          {this.props.voteCount}
        </div>
      </div>;
    }

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
      { this.renderFriendsList() }
      <div className="votetable-row">
        { voteCount }
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
