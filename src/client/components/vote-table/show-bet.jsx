import React from 'react';

import {CustomCheckbox} from '/src/client/components/custom-checkbox/custom-checkbox.jsx';


export class ShowBet extends React.Component {
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
    return nextState.vote !== this.state.vote;
  }

  handleToggle() {
    let newVote = !this.state.vote;
    this.setState({vote: newVote});
    this.props.handleToggle(newVote);
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

    return <div className="vote-bet-container">
      { avatar }
      <div className="votetable-name">{this.props.bet.name}</div>
      { voteCheckbox }
    </div>;
  }
}


ShowBet.propTypes = {
  // The bet of this row
  bet: React.PropTypes.object,

  // Current player
  player: React.PropTypes.shape({
    vote: React.PropTypes.bool.isRequired,
  }),

  // Should show avatar
  showAvatar: React.PropTypes.bool,

  // Will be called when checkbox is toggled
  handleToggle: React.PropTypes.func.isRequired,
};
