Template.accountSettings.events({
  "click #registerWithFacebook": function (event) {
    event.preventDefault();
    Meteor.loginWithFacebook({

    }, function(error) {
        if (error) {
            console.log(error);
        }
    });
  }
});