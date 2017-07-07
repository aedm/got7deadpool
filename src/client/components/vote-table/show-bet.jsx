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
    let prevEpisode = this.props.status ? this.props.status.episode : null;
    let nextEpisode = nextProps.status ? nextProps.status.episode : null;
    return nextState.vote !== this.state.vote ||
      prevEpisode !== nextEpisode;
  }

  handleToggle() {
    let newVote = !this.state.vote;
    this.setState({vote: newVote});
    this.props.handleToggle(newVote);
  }

  renderNameAndStatus() {
    if (!this.props.showStatus) {
      return <div className="votetable-name">{this.props.bet.name}</div>;
    }
    let isAlive = !this.props.status || !this.props.status.episode;
    return <div className="votetable-name">
      {this.props.bet.name}<br />
      { isAlive ?
        <div className="votetable-status votetable-alive">
          {this.props.showAvatar ? "Alive" : "Not yet"}
        </div>
          :
        <div className="votetable-status votetable-dead">
          {(this.props.showAvatar ? "Died in episode " : "In episode ") + this.props.status.episode}
        </div>
      }
    </div>;
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
      { this.renderNameAndStatus() }
      { voteCheckbox }
      <br/>
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

  // Show character / events status (eg. dead or alive)
  showStatus: React.PropTypes.bool,

  // Status
  status: React.PropTypes.shape({
    episode: React.PropTypes.number,
    comment: React.PropTypes.string,
  }),
};
