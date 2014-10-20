Meteor.methods({
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

onAddPointsLevelUp = function(points) {
  var level = Meteor.user().level;
  if (level.pointsToLevelUp > points) {
    console.log('no level up');
    noLevelUp(Meteor.user(), level, points);
  } else {
    console.log('level up');
    var nextLevelNumber = level.levelNumber + 1;
    while (Meteor.user().level.pointsToLevelUp <= points) {
      points = points - Meteor.user().level.pointsToLevelUp;
      var newLevel = Levels.findOne({levelNumber: nextLevelNumber});
      newLevel.pointsToLevelUp = newLevel.pointsThreshold - points;
      console.log(newLevel);
      console.log('levelled to level ' + newLevel.levelNumber);
      Meteor.users.update(Meteor.user()._id, {$set: {level: newLevel}});
      nextLevelNumber++;
    }
    noLevelUp(Meteor.user(), level, points);
  }
}

noLevelUp = function(user, level, points) {
  var newPointsToLevelUp = level.pointsToLevelUp - points;
  level.pointsToLevelUp = newPointsToLevelUp;
  Meteor.users.update(user._id, {$set: {level: level}});
}