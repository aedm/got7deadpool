import {Meteor} from "meteor/meteor";
import {Players} from '/src/collections/players.js';
import {AppState} from '/src/collections/app-state.js';
import {Bets} from '/src/game/bets.js';


Meteor.methods({
  "util/countVotes": function () {
    let deathCount = {};
    _.keys(Bets).forEach(key => deathCount[key] = 0);

    let players = Players.find().fetch();
    players.forEach(player => {
      player.votes.forEach(token => deathCount[token]++);
    });

    AppState.update("votecount", deathCount);
  },
});
