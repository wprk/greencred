Template.dashboard.helpers({
  pointsToNextLevel: function() {
  	if (Meteor.userId) {
	    Meteor.call('pointsToNextLevel', function (error, result) {
			Session.set('pointsToNextLevel', result);
	    });
	}
	return Session.get('pointsToNextLevel');
  },
  currentLevel: function() {
  	if (Meteor.userId) {
  		Meteor.call('userCurrentLevel', function (error, result) {
			Session.set('userCurrentLevel', result);
  		});
  	}
	return Session.get('userCurrentLevel');
  },
  nextLevel: function() {
    if (Meteor.userId) {
	  	Meteor.call('userNextLevel', function (error, result) {
			Session.set('userNextLevel', result);
	    });
    }
	return Session.get('userNextLevel');
  },
  percentComplete: function() {
	if (Meteor.userId) {
		Meteor.call('percentComplete', function (error, result) {
				Session.set('percentComplete', result);
	    	}
		);
	}
	return Session.get('percentComplete');
  }
});