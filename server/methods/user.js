Meteor.methods({
  addPoints: function (points) {
  	originalPoints = points;
    userId = this.userId;
    var level = Meteor.user().level;
    if (level.pointsToLevelUp > points) {
    	console.log('no level up');
    	var newPointsToLevelUp = level.pointsToLevelUp - points;
    	level.pointsToLevelUp = newPointsToLevelUp;
	    Meteor.users.update(userId, {$set: {level: level}});
    } else {
    	console.log('level up');
    	var newLevelNumber = level.levelNumber + 1;
	    while (Meteor.user().level.pointsToLevelUp <= points) {
	    	points = points - Meteor.user().level.pointsToLevelUp;
		    var newLevel = Levels.findOne({levelNumber: newLevelNumber});
		    newLevel.pointsToLevelUp = newLevel.pointsThreshold - points;
		    Meteor.users.update(userId, {$set: {level: newLevel}});
	    	newLevelNumber++;
	    	console.log('levelled to level' + newLevel.levelNumber);
	    }
	}
    Meteor.users.update(userId, {$inc: {points: originalPoints}});
  },
  userCurrentLevel: function () {
  	if (Meteor.user()) {
	   	var userCurrentLevel = Meteor.user().level.levelNumber;
	   	return userCurrentLevel;
    }
  },
  userNextLevel: function () {
    if (Meteor.user()) {
	  	var userNextLevel = Meteor.user().level.levelNumber + 1;
	    return userNextLevel;
	}
  }
});