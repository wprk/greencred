Template.forgotPassword.events({
  "click #sendPasswordReset": function (event, template) {
    event.preventDefault();
    
    var email = $('#accountEmail').val();
    
	Accounts.forgotPassword({
		email: email
    }, function(error) {
        if (error) {
            Alerts.add('Password reset could not be sent. Please try again.', 'danger');
        } else {
            Alerts.add('Password reset email sent.', 'success');
            Router.go('login');
        }
    });
  }
});