Template.formElement_travelMethod.events({
  "click #walk, click #cycle, click #train, click #bus, click #carshare, click #car": function (event) {
    event.preventDefault();
    var travelMethod = event.target.dataset.travelMethod;
    Session.set('travelMethod', travelMethod);
  },
  "click #carshare": function (event) {
    // @todo create functionality to track other carsharers
    Session.set('travelMethod', 2);
  }
});

Template.formElement_startStop.events({
  "click #start": function (event) {
    if(Session.get('travelMethod')) {
      event.preventDefault();
      Session.set('isTracking', true);
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
      var points = calcPoints();
      Journeys.insert({
        userId: Meteor.userId(),
        travelMethod: Session.get('travelMethod'),
        date: moment(Session.get('startTime')).format('DD/MM/YY'),
        startTime: moment(Session.get('startTime')).unix(),
        endTime: moment().unix(),
        duration: calcDuration(Session.get('timeElapsed'), true),
        distance: Session.get('distanceTravelled'),
        points: points
      }, function() {
        Meteor.call('addPoints', points);
        Session.set('isTracking', false);
        Session.set('startTime', null);
        Session.set('startLocation', null);
        Session.set('travelMethod', null);
      });
    }
  }
});

timeCounter = function() {
  var startTime = moment(Session.get('startTime'));
  var now = moment();
  var milliseconds = now.diff(startTime);
  Session.set('timeElapsed', milliseconds);

  var startLocation = Session.get('startLocation');
  var currentLocation = 0.39;
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

calcDuration = function(timeElapsed, withoutMilliseconds) {
  var hours = lessThanTen(Math.floor(timeElapsed / 1000 / 60 / 60));
  var minutes = lessThanTen(Math.floor((timeElapsed - (hours*60*60*1000)) / 1000 / 60));
  var seconds = lessThanTen(Math.floor((timeElapsed - (minutes*60*1000)) / 1000));
  var milliseconds = lessThanTen(Math.floor((timeElapsed - (seconds*1000))));
  return hours + ':' + minutes + ':' + seconds + (withoutMilliseconds ? '' : ':' + milliseconds);
}

calcPoints = function() {
  var transportPoints = travelMethodValue(Session.get('travelMethod'));
  var distance = Session.get('distanceTravelled');
  var percentageOfCommute = 100;
  return Math.floor((transportPoints * distance * percentageOfCommute) / 10);
}

travelMethodValue = function(method) {
  switch(method) {
    case 'car':
      return 1;
    case 'carshare':
      return 1 * Session.get('passengers');
    case 'bus':
      return 8;
    case 'train':
      return 12;
    case 'cycle':
      return 16;
    case 'walk':
      return 20;
  }
}