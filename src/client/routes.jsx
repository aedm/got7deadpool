import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import { App } from '/src/client/components/app.jsx';


FlowRouter.route('/', {
  action() {
    mount(App);
  }
});
