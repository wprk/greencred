Template.emailNotVerified.helpers({
  'emailList': function() {
    list = [];
    if(Meteor.user()) {
      emails = Meteor.user().emails;
      for (var i = 0; i < emails.length; i++) {
        if (emails[i].verified == false) {
          list.push({email: emails[i].address});
        }
      }
    }
    return list;
  }
});

Template.emailNotVerified.events({
  "click #sendVerificationEmail": function (event) {
    event.preventDefault();
    
    var email = $('input#verificationEmail').val();

    Meteor.call('sendVerificationEmail', email);
  }
});