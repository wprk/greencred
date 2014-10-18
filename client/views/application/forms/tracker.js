Template.recentJourneys.helpers({
	journeys: function() {
		return Journeys.find({}, {limit: 5, sort: {'startTime': -1}});
	}
});