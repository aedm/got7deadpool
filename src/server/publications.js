import {Meteor} from 'meteor/meteor';

import {Players} from '/src/collections/players.js';
import {AppState} from '/src/collections/app-state.js';


// Publishes the last few registered players
Meteor.publishComposite("player/sub/friends", {
  find: function () {
    if (!this.userId) throw new Meteor.Error("must log in");
    return Meteor.users.find(this.userId);
  },
  children: [{
    find: function (user) {
      // Return the player objects of the player and her friends
      let ids = user.profile.friendIds.concat(user._id);
      return Players.find({_id: {$in: ids}});
    }
  }],
});


// Publishes the players own document
Meteor.publish("player/sub/votes", function () {
  return Players.find(this.userId);
});


// Always publish the entire configuration object
Meteor.publish(null, function () {
  return AppState.find();
});