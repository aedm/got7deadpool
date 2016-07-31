import {AppState} from '/src/collections/app-state.js';
import {Bets} from '/src/game/bets.js';

Meteor.startup(function () {
  // Inserts configuration objects if they don't exist yet
  AppState.upsert("gameprogress",
      {
        $setOnInsert: {
          // Game progress. Shows the current episode.
          episode: 0,
        }
      }
  );

  AppState.upsert("deathlist",
      {
        $setOnInsert: {
          // List of dead characters and occurred events by episode
          // array of {deaths: {token: Boolean}}
          episodes: [],
        }
      }
  );

  // TODO: use _.mapObject instead once Meteor's "underscore" package gets updated
  let defaultDeaths = {};
  _.keys(Bets).forEach(key => defaultDeaths[key] = 0);
  AppState.upsert("votecount",
      {
        // List of dead characters and occurred events by episode
        // array of {deaths: {token: Boolean}}
        $setOnInsert: defaultDeaths,
      }
  );

});