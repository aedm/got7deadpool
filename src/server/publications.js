import {Meteor} from 'meteor/meteor';
import {Players} from '/src/collections/players.js';
import {Configuration} from '/src/collections/configuration.js';

Meteor.publish("player/sub/players-latest", function () {
  return Players.find({}, {sort: {registerTime: -1}});
});

// Always publish the entire configuration object
Meteor.publish(null, function() {
  return Configuration.find();
});