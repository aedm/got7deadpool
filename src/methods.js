import {Meteor} from "meteor/meteor";
import {check} from 'meteor/check';

import {AppState} from '/src/collections/app-state.js';
import {Players} from '/src/collections/players.js';


Meteor.methods({
  /**
   * Places a bet on a certain `betToken` character or event.
   *
   *   Meteor.call("player/bet", "cersei", true);
   *
   * @param {String} betToken
   * @param {Boolean} bet
   */
  "player/bet": function (betToken, bet) {
    if (!Meteor.userId()) throw new Meteor.Error("must log in");
    check(betToken, String);
    check(bet, Boolean);

    if (bet) {
      let affectedCount = Players.update(
          {
            _id: Meteor.userId(),
            votes: { $ne: betToken},
          },
          {$addToSet: {votes: betToken}},
          {filter: false});
      if (affectedCount) {
        AppState.update("votecount", {$inc: {[betToken]: 1}});
      }
    } else {
      let affectedCount = Players.update(
          {
            _id: Meteor.userId(),
            votes: betToken,
          },
          {$pull: {votes: betToken}},
          {filter: false});
      if (affectedCount) {
        AppState.update("votecount", {$inc: {[betToken]: -1}});
      }
    }
  },
});
