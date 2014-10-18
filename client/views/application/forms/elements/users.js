Template.formElement_firstName.helpers({
  firstName: function() {
  	if (Meteor.user()) {
      return Meteor.user().profile.firstName;
	  }
  }
});
Template.formElement_lastName.helpers({
  lastName: function() {
  	if (Meteor.user()) {
      return Meteor.user().profile.lastName;
    }
  }
});
Template.formElement_email.helpers({
  emails: function() {
  	if (Meteor.user()) {
      return Meteor.user().emails;
	  }
  }
});