import {Configuration} from '/src/collections/configuration.js';
import {Bets} from '/src/game/bets.js';

Meteor.startup(function () {
  // Inserts configuration objects if they don't exist yet
  Configuration.upsert("gameprogress",
      {
        $setOnInsert: {
          // Game progress. Shows the current episode.
          episode: 0,
        }
      }
  );

  Configuration.upsert("deathlist",
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
  Configuration.upsert("votecount",
      {
        // List of dead characters and occurred events by episode
        // array of {deaths: {token: Boolean}}
        $setOnInsert: defaultDeaths,
      }
  );

});