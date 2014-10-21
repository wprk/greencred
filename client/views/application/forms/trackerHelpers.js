Template.travelMethod.helpers({
  isActive: function(travelMethod) {
    if (Session.get('travelMethod'))
    {
      if(travelMethod === Session.get('travelMethod')) {
        return true;
      }
    }
    return false;
  }
});

Template.startStop.helpers({
  isTracking: function() {
    if (Session.get('isTracking'))
    {
      return Session.get('isTracking');
    } else {
      return false;
    }
  }
});

Template.stopwatch.helpers({
  stopwatchValue: function() {
    if (Session.get('startTime') instanceof Date)
    {
      return calcDuration(Session.get('timeElapsed'), false);
    } else {
      return '00:00:00';
    }
  }
});

Template.distance.helpers({
  distanceValue: function() {
    if (Session.get('distanceTravelled')) {
      return Session.get('distanceTravelled').toFixed(5);
    } else {
      return '0.00000';
    }
  }
});

Template.recentJourneys.helpers({
  journeys: function() {
    return Journeys.find({}, {limit: 5, sort: {'startTime': -1}});
  }
});