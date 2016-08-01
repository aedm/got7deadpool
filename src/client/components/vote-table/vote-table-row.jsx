import {Meteor} from 'meteor/meteor';
import React from 'react';
import {Checkbox} from 'react-bootstrap';

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
    let saturation = 60 + 30 * ratio;
    return `hsl(${hue},${saturation}%,90%)`;
  }

  render() {
    let voteCell = null;
    if (this.props.voteCount >= 0) {
      let background = this.getBackgroundColor();
      voteCell = <td className="votetable-count" style={{"backgroundColor": background}}>
        {this.props.voteCount}
      </td>;
    } else {
      voteCell = <td className="votetable-count"/>;
    }

    let playerCell = null;
    if (this.props.player) {
      playerCell = <td>
        <Checkbox ref="vote" checked={this.state.vote} onChange={() => this.handleToggle()}/>
      </td>;
    }

    return <tr key={this.props.token}>
      { voteCell }
      <td className="votetable-name">{this.props.bet.name}</td>
      { playerCell }
      { this.props.votes.map((vote, index) => <td key={index}>
        <Checkbox disabled checked={vote}/>
      </td>)}
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
  votes: React.PropTypes.arrayOf(React.PropTypes.bool),

  // Sum of all counts for this bet
  voteCount: React.PropTypes.number,

  // The number of votes on the most popular bet
  maxVoteCount: React.PropTypes.number,
};
