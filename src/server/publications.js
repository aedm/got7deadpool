import {Meteor} from 'meteor/meteor';
import {Players} from '/src/collections/players.js';

Meteor.publish("player/sub/players-latest", function () {
  return Players.find({}, {sort: {registerTime: -1}});
});
