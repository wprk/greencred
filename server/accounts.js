Accounts.onCreateUser(function(options, user) {
		
	if (user.services != null) {
		service = _.keys(user.services)[0];
		email = user.services[service].email;
		if (email != null) {
			oldUser = Meteor.users.findOne({
				"emails.address": email
			});
			if (oldUser != null) {
				if (oldUser.services == null) {
					oldUser.services = {};
				}
				if (service === "google" || service === "facebook") {
					oldUser.services[service] = user.services[service];
					Meteor.users.remove(oldUser._id);
					user = oldUser;
				}
			} else {
				if (service === "google" || service === "facebook") {
					if (user.services[service].email != null) {
						user.emails = [{
							address: user.services[service].email,
							verified: true
						}];
					} else {
						throw new Meteor.Error(500, "" + service + " account has no email attached");
					}
				}
			}
		}
	}
	
	if (user.profile == null) {
		user.profile = {};
		var name = options.profile.name.split(" ");
		var firstName = name[0];
		var lastName = name[1];
		if (options.profile != null) {
			user.profile.firstName = firstName;
			user.profile.lastName = lastName;
		}
	}
	
	return user;
});