import {Meteor} from "meteor/meteor";

import {Rights} from "/src/lib/rights.js";
import {Logger} from "/src/lib/logger.js";
import {Calculator} from "/src/server/roles/admin/calculator.js";

// Administrator-level methods.
// These methods check whether the user has admin rights before doing anything.

const adminMethod = function(name, methodFunction) {
  let methodDef = {};
  methodDef[name] = function() {
    if (!this.userId) {
      throw new Meteor.Error("Need to be logged in.");
    }
    // Needs admin rights.
    if (!Rights.isAdmin(this.userId)) {
      Logger.error(`Admin method call attempt, insufficient rights: "${name}" by user._id: ${this.userId}`);
      throw new Meteor.Error("Insufficient rights.");
    }
    Logger.debug(`[ADMIN] Method call: "${name}" by user._id: ${this.userId}`);
    return methodFunction.apply(this, arguments);
  };
  Meteor.methods(methodDef);
};


adminMethod("admin/countVotes", function() {
  Calculator.countVotes();
});

