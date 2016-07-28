import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {chai} from 'meteor/practicalmeteor:chai';
import {stubs} from 'meteor/practicalmeteor:sinon';
import {resetDatabase} from 'meteor/xolvio:cleaner';

// Dummy collection
const TestCollection = new Mongo.Collection("test");

// Dummy method to test
Meteor.methods({
  "test/dummy-method": function(value) {
    TestCollection.upsert(Meteor.userId(), {value});
  }
});

// Dummy test suite
describe('dummy server test suite', function () {
  let fakeUser = {
    _id: "rdash",
    username: "Rainbow Dash",
  };

  beforeEach(function () {
    resetDatabase();
    stubs.create('fakeUserId', Meteor, 'userId').returns(fakeUser._id);
    stubs.create('fakeUser', Meteor, 'user').returns(fakeUser);
  });

  afterEach(function () {
    stubs.restoreAll();
  });

  // Tests a database insertion
  it('dummy method test', function () {
    Meteor.call("test/dummy-method", "applejack");
    let doc = TestCollection.findOne(fakeUser._id);
    chai.assert.isDefined(doc);
    chai.assert.equal(doc.value, "applejack");
  });
});

