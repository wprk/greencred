Template.formElement_travelMethod.events({
  "click #walk, click #cycle, click #bus, click #train": function (event) {
    event.preventDefault();
    var travelMethod = event.target.href.split("#")[1];
    Session.set('travelMethod', travelMethod);
  }
});

Template.formElement_startStop.events({
  "click #start": function (event) {
    if(Session.get('travelMethod')) {
      event.preventDefault();
      Session.set('startTime', new Date);
      Session.set('startLocation', 0);
      stopwatchInterval = Meteor.setInterval(timeCounter, 23);
    } else {
      alert('Please select a travel method first.')
    }
  },
  "click #stop": function (event) {
    event.preventDefault();
    Meteor.clearInterval(stopwatchInterval);
    if (Session.get('startTime')) {
      Journeys.insert({
        userId: Meteor.userId(),
        travelMethod: Session.get('travelMethod'),
        date: moment(Session.get('startTime')).format('DD/MM/YY'),
        startTime: moment(Session.get('startTime')).unix(),
        endTime: moment().unix(),
        distance: Session.get('distanceTravelled'),
        points: Session.get('distanceTravelled') * 100000
      }, function() {
        Session.set('startTime', null);
        Session.set('startLocation', null);
        Session.set('travelMethod', null);
      });
    }
  }
});

Template.stopwatch.helpers({
  stopwatchValue: function() {
    if (Session.get('startTime') instanceof Date)
    {
      var hours = lessThanTen(Math.floor(Session.get('timeElapsed') / 1000 / 60 / 60));
      var minutes = lessThanTen(Math.floor((Session.get('timeElapsed') - (hours*60*60*1000)) / 1000 / 60));
      var seconds = lessThanTen(Math.floor((Session.get('timeElapsed') - (minutes*60*1000)) / 1000));
      var milliseconds = lessThanTen(Math.floor((Session.get('timeElapsed') - (seconds*1000))));
      return hours + ':' + minutes + ':' + seconds + ':' + milliseconds;
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

timeCounter = function() {
  var startTime = moment(Session.get('startTime'));
  var now = moment();
  var milliseconds = now.diff(startTime);
  Session.set('timeElapsed', milliseconds);

  var startLocation = Session.get('startLocation');
  var currentLocation = 0.00007;
  var distanceTravelled = startLocation + currentLocation;
  Session.set('distanceTravelled', distanceTravelled);
}

if (Session.get('startTime') instanceof Date)
{
  stopwatchInterval = Meteor.setInterval(timeCounter, 23);
}

lessThanTen = function(value) {
  if (value < 10) {
    return '0' + value;
  } else {
    return value;
  }
}