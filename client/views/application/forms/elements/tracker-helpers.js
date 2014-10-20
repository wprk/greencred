Template.formElement_startStop.helpers({
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
      return parseFloat(Session.get('distanceTravelled'));
    } else {
      return '0.0';
    }
  }
});