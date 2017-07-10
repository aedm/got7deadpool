import React from 'react';
import {createContainer} from 'meteor/react-meteor-data';

import {Players} from '/src/collections/players.js';
import {AppState} from '/src/collections/app-state.js';

class _ResultsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  renderBeforeSeason() {
    return <div className="container">
      <div className="game-page">
        <h2>Results</h2>
        <p>A girl has no points yet.</p>
        <p>A girl must check back after the first episode has aired.</p>
      </div>
    </div>;
  }

  render() {
    if (!this.props.gameProgress || !this.props.gameProgress.isVotingClosed) {
      return this.renderBeforeSeason();
    }

    let resultsLabel = this.props.gameProgress.episode === 0
      ? <h2>Scores before the first episode</h2>
      : <h2>Scores after episode {this.props.gameProgress.episode}</h2>;

    return <div className="container">
      <div className="game-page">
        { resultsLabel }
        <p className="results-info">This page lists your Facebook friends only.
          There are {this.props.gameProgress.playerCount} players in this game.</p>
        <div className="results-list">
          { this.props.players.map(player => {
            let score = player.scores[this.props.gameProgress.episode];
            let selfClass = player._id === this.props.user._id ? "results-self" : "results-others";
            return <div key={player._id} className={"results-item " + selfClass}>
              <span className="results-position">{score.position + 1}.</span>
              {player.profile.name} ({score.score})
            </div>;
          })}
        </div>
      </div>
    </div>;

  }
}


export const ResultsPage = createContainer(() => {
  let gameProgress = AppState.findOne("gameProgress");
  let players = null;
  if (!!gameProgress && +gameProgress.isVotingClosed) {
    let selector = `scores.${gameProgress.episode}.position`;
    players = Players.find({}, {sort: {[selector]: 1}}).fetch();
  }

  return {
    user: Meteor.user(),
    players,
    gameProgress,
  };
}, _ResultsPage);
