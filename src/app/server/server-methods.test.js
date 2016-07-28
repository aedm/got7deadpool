import {Meteor} from 'meteor/meteor';
import {chai} from 'meteor/practicalmeteor:chai';
import {stubs} from 'meteor/practicalmeteor:sinon';
import {resetDatabase} from 'meteor/xolvio:cleaner';

import 'app/methods.js';
import { Players } from 'app/collections/players.js';


describe('my module', function () {
  let userId = "applejack";

  beforeEach(function () {
    resetDatabase();
    stubs.create('fakeuserId', Meteor, 'userId').returns(userId);
    stubs.create('fakeuser', Meteor, 'user').returns({
      _id: userId,
      username: "Rainbow Dash",
    });
  });

  afterEach(function () {
    stubs.restoreAll();
  });


  it('cöllye', function () {
    Meteor.call("player-bet", "cersei", true);
    let t = Players.findOne({userId});
    chai.assert.isNotNull(t);
    chai.assert.equal(t["cersei"], true); 
  });


  // it('puff call', function () {
  //   Meteor.call("puff");
  //   let t = Tasks.findOne({owner: 5});
  //   chai.assert.isNotNull(t);
  //   chai.assert.equal(t.text, "sajt");
  // });
  //
  // it('addTask call', function () {
  //   Meteor.call("addTask", "sajt");
  //   let t = Tasks.findOne({owner: userId});
  //   console.log(JSON.stringify(t));
  //   chai.assert.isNotNull(t);
  //   chai.assert.equal(t.text, "sajt");
  // });
});
