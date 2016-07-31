import {Meteor} from "meteor/meteor";
import {check} from 'meteor/check';

import {Configuration} from '/src/collections/configuration.js';
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
      Players.update(
          Meteor.userId(),
          {$addToSet: {votes: betToken}},
          {filter: false});
    } else {
      Players.update(
          Meteor.userId(),
          {$pull: {votes: betToken}},
          {filter: false});
    }
    Configuration.update("votecount", {$inc: {[betToken]: bet ? 1 : -1}});
  },
});
