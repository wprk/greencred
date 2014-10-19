// if the database is empty on server start, create some sample data.
Meteor.startup(function () {
	if (Levels.find().count() === 0) {
		var previousThreshold = 0;
		for (var i = 1; i <= 15; i++) {
			var pointsThreshold = (i * 150) * i;
			var level = {
				levelNumber: i,
				pointsThreshold: pointsThreshold,
				pointsToPreviousLevel: previousThreshold,
				levelRange: pointsThreshold - previousThreshold
			};
			var previousThreshold = pointsThreshold;
			Levels.insert(level);
		};
	}
});