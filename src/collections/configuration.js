import { Mongo } from 'meteor/mongo';
import 'meteor/aldeed:collection2';

// App configuration
export const Configuration = new Mongo.Collection("configuration");
