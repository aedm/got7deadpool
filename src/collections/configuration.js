import { Mongo } from 'meteor/mongo';
import 'meteor/aldeed:collection2';

// This collection stores values that have only one instance.
export const Configuration = new Mongo.Collection("configuration");

/*
The collection has the following structure:

 {
   _id: "gameprogress"
   week: {Number} The week, default 0

 }

 */
