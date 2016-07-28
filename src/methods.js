import { Meteor } from "meteor/meteor";

import { Players } from 'app/collections/players.js';


Meteor.methods({
  "player-bet": function(betToken, bet) {
    check(betToken, string);
    check(bet, boolean);
    if (!this.userId()) throw new Meteor.Error("must log in");

    Players.update({userId: this.userId()}, {$set: {[betToken]: bet}});
  }
});
