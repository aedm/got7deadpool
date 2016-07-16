import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';
import { AppMain } from 'app/client/components/app-main';

FlowRouter.route('/', {
  action() {
    mount(AppMain);
  }
});
