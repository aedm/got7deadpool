import React from 'react';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {mount} from 'react-mounter';

import {App} from '/src/client/pages/app.jsx';
import {GamePage} from '/src/client/pages/game-page/game-page.jsx';
import {ResultsPage} from '/src/client/pages/results-page/results-page.jsx';
import {RulesPage} from '/src/client/pages/rules-page/rules-page.jsx';
import {AboutPage} from '/src/client/pages/about-page/about-page.jsx';


let allRoutes = FlowRouter.group({
  name: 'public',
  triggersEnter: [() => {
    window.scrollTo(0, 0);
  }],
});

let loggedInRoutes = allRoutes.group({
  name: "loggedIn",
  triggersEnter: [(context, redirect) => {
    // If a user is not logged in, throw her back to the login page
    if (!Meteor.loggingIn() && !Meteor.userId()) {
      redirect("/");
    }
    window.scrollTo(0, 0);
  }]
});


let defineRoute = (label, page) => {
  allRoutes.route("/" + label, {
    name: label,
    action() {
      mount(App, {content: page, selectedHeaderPage: label});
    }
  });
};

let defineLoginRoute = (label, page) => {
  loggedInRoutes.route("/" + label, {
    name: label,
    action() {
      mount(App, {content: page, selectedHeaderPage: label});
    }
  });
};


allRoutes.route('/', {
  action() {
    mount(App, {content: () => (<GamePage />)});
  }
});

defineLoginRoute("results", () => (<ResultsPage />));
defineRoute("rules", () => (<RulesPage />));
defineRoute("about", () => (<AboutPage />));
