Template.accountLoggedIn.events({
  "click #logout": function (event) {
    event.preventDefault();
    Meteor.logout(function() {
      Alerts.add('You have been logged out.', 'danger');
      Router.go('login');
    });
  }
});

Template.accountLoggedIn.helpers({
  isActivePage: function (page) {
    return isActivePage(page);
  }
});

Template.accountLoggedOut.helpers({
  isActivePage: function (page) {
    return isActivePage(page);
  }
});

isActivePage = function(page) {
  var controller = Router.current();
  var currentPage = controller.route.name;
  if (currentPage === page) {
    return true;
  }
  return false;
}