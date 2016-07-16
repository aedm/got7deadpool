import { FlowRouter } from 'meteor/kadira:flow-router';

import 'app/client/index.jsx';

Meteor.startup(function() {
  FlowRouter.initialize();
});
