import {Meteor} from 'meteor/meteor';
import {Players} from '/src/collections/players.js';
import {AppState} from '/src/collections/app-state.js';
import {Configuration} from '/src/configuration.js';

// Publishes the last few registered players
Meteor.publish("player/sub/players-latest", function () {
  return Players.find({}, {
    sort: {registerTime: -1},
    limit: Configuration.MaxPlayerCountToShow,
  });
});

// Publishes the players own document
Meteor.publish("player/sub/votes", function () {
  if (!Meteor.userId()) throw new Meteor.Error("must log in");
  return Players.find(Meteor.userId());
});


// Always publish the entire configuration object
Meteor.publish(null, function() {
  return AppState.find();
});