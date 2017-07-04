import {check} from 'meteor/check';

import {Players} from '/src/collections/players.js';
import {AppState} from '/src/collections/app-state.js';
import {Logger} from "/src/lib/logger.js";
import {
  OnePointCharacters,
  TwoPointCharacters,
  ThreePointCharacters,
  TwoPointEvents,
  Bets
} from '/src/game/bets.js';


export const Calculator = {
  // Recounts the sum of votes based on individual player votes
  countVotes() {
    let deathCount = {};
    _.keys(Bets).forEach(key => deathCount[key] = 0);

    let players = Players.find().fetch();
    players.forEach(player => {
      player.votes.forEach(token => deathCount[token]++);
    });

    AppState.update("voteCount", deathCount);
  },

  /**
   * Updates game state and standings for all players
   *
   * @param episode Number last episode
   * @param deadPool Object {token: episode Number} episodes in which events occured
   */
  updateGameState(episode, deadPool) {
    check(episode, Number);
    check(deadPool, Object);

    // Calcate score for a range of bets
    function summarizeBets(betArray, playerBets, ep) {
      let score = 0;
      betArray.forEach(bet => {
        let token = bet.token;
        let isDead = !!deadPool[token] && deadPool[token] <= ep;
        let isVoted = !!playerBets[token];
        if (isDead) {
          score += isVoted ? 2 : -1;
        } else {
          score += isVoted ? 0 : 1;
        }
      });
      return score;
    }

    // Calculate score for all episodes
    let players = Players.find().fetch();
    players.forEach(player => {
      Logger.debug("Updating player", player.profile.name);
      let playerBets = {};
      player.votes.forEach(token => {
        playerBets[token] = true;
      });

      let scores = [];
      for (let ep = 0; ep <= episode; ep++) {
        let score = 0;
        score += 3 * summarizeBets(ThreePointCharacters, playerBets, ep);
        score += 2 * summarizeBets(TwoPointCharacters, playerBets, ep);
        score += 1 * summarizeBets(OnePointCharacters, playerBets, ep);
        score += 2 * summarizeBets(TwoPointEvents, playerBets, ep);
        scores.push({
          score,
          position: 0,
        });
      }
      player.scores = scores;
    });

    // Rank players
    for (let ep = 0; ep <= episode; ep++) {
      players.sort((a, b) => a.scores[ep].score < b.scores[ep].score);
      for (let i = 0; i < players.length; i++) {
        let position = (i > 0 && players[i - 1].scores[ep].score === players[i].scores[ep].score)
          ? players[i - 1].scores[ep].position
          : i;
        players[i].scores[ep].position = position;
      }
    }

    players.forEach(player => {
      Players.update(player._id,
        {
          $set: {
            scores: player.scores,
          }
        });
    });

    AppState.update("gameProgress", {
      episode,
      deadPool,
    });
  }
};


