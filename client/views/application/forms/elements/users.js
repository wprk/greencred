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
Template.formElement_emails.helpers({
  emails: function() {
    var emails = Meteor.user().emails;
    console.log(emails);
      return emails;
  },
  isEmailVerified: function() {
    return this.verified === true;
  }
});