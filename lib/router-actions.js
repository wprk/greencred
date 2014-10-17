var mustBeSignedIn = function(pause) {
  if (! Meteor.user() && !Meteor.loggingIn()) {
    Router.go('login');
  }
  pause();
};

var onLogin = function(pause) {
  if (Meteor.user() || Meteor.loggingIn()) {
      Router.go('home');
  }
  pause();
};

var no_login_routes = [
  'login',
  'registration',
  'forgotPassword',
  'resetPassword',
  'home',
  'contact',
  'about',
  'termsOfService',
  'privacyPolicy',
  'sitemap'
]

Router.onAfterAction(mustBeSignedIn, {except: no_login_routes});
Router.onAfterAction(onLogin, {only: no_login_routes});

Router.onBeforeAction(function () { Alerts.removeSeen(); });