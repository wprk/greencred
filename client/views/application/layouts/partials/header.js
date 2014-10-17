Template.accountLoggedIn.events({
  "click #logout": function (event) {
    event.preventDefault();
    Meteor.logout(function() {
        Alerts.add('You have been logged out.', 'danger');
        Router.go('login');
    });
  }
});