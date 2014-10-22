Template.forgotPassword.events({
  "click #resetPassword": function (event, template) {
    event.preventDefault();
    
    var pw = $('#password').val();
    
    Accounts.resetPassword(
      Accounts._resetPasswordToken,
      pw,
      function(error) {
        if (error) {
          Alerts.add('Password could not be reset. Please try again.', 'danger');
        }
      }
    );
  }
});