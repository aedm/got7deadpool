import {AppState} from '/src/collections/app-state.js';
import {Bets} from '/src/game/bets.js';
import {Calculator} from "/src/server/roles/admin/calculator.js";

Meteor.startup(function() {
  // Inserts configuration objects if they don't exist yet
  AppState.upsert("gameProgress",
    {
      $setOnInsert: {
        // Game progress. Shows the last aired episode.
        episode: 0,

        // List of dead characters and occurred events.
        // Map of {character_token: {episode: Number, comment: String}}
        deadPool: {},
      }
    }
  );

  // TODO: use _.mapObject instead once Meteor's "underscore" package gets updated
  let defaultDeaths = {};
  _.keys(Bets).forEach(key => defaultDeaths[key] = 0);
  AppState.upsert("voteCount",
    {
      // List of dead characters and occurred events by episode
      // array of {deaths: {token: Boolean}}
      $setOnInsert: defaultDeaths,
    }
  );

  // Recalculate votes
  Calculator.countVotes();
});
