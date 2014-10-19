Meteor.methods({
  percentComplete: function () {
  	if (Meteor.user()) {
	  	level = Levels.findOne({levelNumber: Meteor.user().level.levelNumber});
	  	pointsIntoLevel = Meteor.user().points - level.pointsToPreviousLevel;
	  	if (pointsIntoLevel !== 0) {
	  		percentage = Math.floor((pointsIntoLevel / level.levelRange) * 100);
	  	} else {
	  		percentage = 0;
	  	}
	  	return percentage;
	  }
  }
});