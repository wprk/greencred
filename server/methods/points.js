Meteor.methods({
  addPoints: function (points) {
    originalPoints = points;
    onAddPointsLevelUp(points);
    Meteor.users.update(Meteor.user()._id, {$inc: {points: originalPoints}});
  }
});