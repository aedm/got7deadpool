import {Meteor} from 'meteor/meteor';
import {Players} from '/src/collections/players.js';
import {AppState} from '/src/collections/app-state.js';
import {Configuration} from '/src/configuration.js';

Meteor.publish("player/sub/players-latest", function () {
  return Players.find({}, {
    sort: {registerTime: -1},
    limit: Configuration.MaxPlayerCountToShow,
  });
});

// Always publish the entire configuration object
Meteor.publish(null, function() {
  return AppState.find();
});