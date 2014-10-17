Template.login.events({
  "click #loginWithFacebook": function (event) {
    event.preventDefault();
    Meteor.loginWithFacebook({

    }, function(error) {
        if (error) {
            console.log(error);
        }
    });
  }
});

Template.login.events({
  "click #loginWithGoogle": function (event) {
    event.preventDefault();
    Meteor.loginWithGoogle({

    }, function(error) {
        if (error) {
            console.log(error);
        }
    });
  }
});

Template.login.events({
  "click #loginWithTwitter": function (event) {
    event.preventDefault();
    Meteor.loginWithTwitter({
      requestPermissions: []
    }, function(error) {
        if (error) {
            console.log(error);
        }
    });
  }
});

Template.login.events({
  "click #loginWithGithub": function (event) {
    event.preventDefault();
    Meteor.loginWithGithub({

    }, function(error) {
        if (error) {
            console.log(error);
        }
    });
  }
});

Template.login.events({
  "click #login": function (e) {
    e.preventDefault();
    
    var username = $('input#username').val(),
    password = $('input#password').val();
    
    Meteor.loginWithPassword(username, password, function(error) {
        if (error) {
            Alerts.add(error, 'danger');
            Router.go('login');
        }
    });
  }
});