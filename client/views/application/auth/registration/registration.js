Template.registration.events({
  "click #registerWithFacebook": function (event) {
    event.preventDefault();
    Meteor.loginWithFacebook({
      loginStyle: 'redirect'
    }, function(error) {
      if (error) {
        Alerts.add(error, 'danger');
      }
    });
  }
});

Template.registration.events({
  "click #registerWithGoogle": function (event) {
    event.preventDefault();
    Meteor.loginWithGoogle({}, function(error) {
      if (error) {
        Alerts.add(error, 'danger');
      }
    });
  }
});

Template.registration.events({
  "click #registerWithTwitter": function (event) {
    event.preventDefault();
    Meteor.loginWithTwitter({}, function(error) {
      if (error) {
        Alerts.add(error, 'danger');
      }
    });
  }
});

Template.registration.events({
  "click #registerWithGithub": function (event) {
    event.preventDefault();
    Meteor.loginWithGithub({}, function(error) {
      if (error) {
        Alerts.add(error, 'danger');
      }
    });
  }
});

Template.registration.events({
  "click #register": function (event) {
    event.preventDefault();
    firstName = $('input#firstName').val(),
    lastName = $('input#lastName').val(),
    username = firstName + '.' + lastName,
    email = $('input#email').val(),
    password = $('input#password').val(),
    profile = {
      name: firstName + ' ' + lastName
    },
    roles = {};
    Accounts.createUser({
      email: email,
      username: username,
      password: password,
      profile: profile,
      roles: roles
    }, function(error) {
      if (error) {
        Alerts.add(error, 'danger');
      }
    });
  }
});