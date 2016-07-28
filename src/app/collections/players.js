import { Mongo } from 'meteor/mongo';
import 'meteor/aldeed:collection2';

// Player data: votes, scores, basic profile
export const Players = new Mongo.Collection("players");

// Data schema for the "Players" collection.
Players.attachSchema(new SimpleSchema({
  "profile": {
    type: Object,
    label: "Profile",
  },

  // Facebook name of player
  "profile.name": {
    type: String,
    label: "Name",
  },

  // Facebook photo of player
  "profile.photo": {
    type: String,
    label: "Photo",
  },

  // Votes
  "votes": {
    type: [Object],
    optional: true,
    blackbox: true,
  },

  // Scores
  "scores": {
    type: [Object],
    optional: true,
  },

  // Score after nth episode
  "scores.$.score": {
    type: Number,
    optional: true,
  },


  // Birth date of patient
  "birth_date": {
    type: Date,
    label: "Birth date",
  },

  // Last journal entry for the user
  "last_update": {
    type: Object,
    label: "Last entry",
    optional: true,
  },
  "last_update.date_time": {
    type: Date,
    label: "Last entry date",
  },
  "last_update.user_id": {
    type: String,
    label: "User who made the last entry",
  },
  "last_update.patient_id": {
    type: String,
    label: "Patient id",
  },
  "last_update.data": {
    type: Object,
    label: "User who added the last entry",
    blackbox: true
  },

  // Access rights to patient data are stored in an array. Each of these users have
  // read access by default.
  "access": {
    type: [Object],
    optional: true
  },

  // User email. Users are added by email, and this is the default identifier to add someone
  // to the list of users for the patient.
  "access.$.email": {
    type: String,
    optional: true,
  },

  // User id
  "access.$.user_id": {
    type: String,
    optional: true,
  },

  // User rights to patient data, eg. Rights.PATIENT_WRITE.
  "access.$.rights": {
    type: [String],
    optional: true
  },

  // Indicated whether the user has accepted her email invitation yet.
  "access.$.accepted": {
    type: [Boolean],
    optional: true
  },
}));
