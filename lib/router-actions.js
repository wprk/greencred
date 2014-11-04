var mustBeSignedIn = function() {
  if (! Meteor.user() && !Meteor.loggingIn()) {
    Router.go('login');
  } else {
    this.next();
  }
};

var onLogin = function() {
  if (Meteor.user() || Meteor.loggingIn()) {
      Router.go('tracker');
  } else {
    this.next();
  }
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
Router.onAfterAction(onLogin, {only: ['login']});

Router.onBeforeAction(function () {
  Alerts.removeSeen();
  this.next();
});