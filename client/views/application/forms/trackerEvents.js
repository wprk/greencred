// on load continue tracking where left off
if (Session.get('isTracking'))
{
  timeInterval = Meteor.setInterval(timeCounter, 25);
  distanceInterval = Meteor.setInterval(distanceCounter, 75);
}

Template.travelMethod.events({
  "click #walk, click #cycle, click #train, click #bus, click #carshare, click #car": function (event) {
    if (Session.get('startTime') instanceof Date)
    {
      alert('Please stop your current journey before changing travelMethods');
    } else {
      var travelMethod = event.target.dataset.travelMethod;
      Session.set('travelMethod', travelMethod);
    }
  },
  "click #carshare": function (event) {
    // @todo create functionality to track other carsharers
    Session.set('carSharePassengers', 3);
  }
});

Template.startStop.events({
  "click #start": function (event) {
    event.preventDefault();
    if(Session.get('travelMethod')) {
      startTracking();
    } else {
      alert('Please select a travel method first.')
    }
  },
  "click #stop": function (event) {
    event.preventDefault();
    if (Session.get('isTracking')) {
      stopTracking();
    }
  }
});

timeCounter = function() {
  var startTime = moment(Session.get('startTime'));
  var now = moment();
  var milliseconds = now.diff(startTime);
  Session.set('timeElapsed', milliseconds);
}

distanceCounter = function() {
  if (Session.get('distanceTravelled')) {
    var previousLocation = Session.get('previousLocation');
    var currentLocation = getCurrentLocation();
    var distanceTravelled = +Session.get('distanceTravelled') + +calcDistance(previousLocation, currentLocation);
    console.log(Session.get('distanceTravelled'));
    console.log(distanceTravelled);
    Session.set('previousLocation', currentLocation);
    Session.set('distanceTravelled', distanceTravelled);
  } else {
    var currentLocation = getCurrentLocation();
    Session.set('previousLocation', currentLocation);
    Session.set('distanceTravelled', calcDistance(Session.get('startLocation'), currentLocation));
  }
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

// Work out the distance in miles between two points
calcDistance = function(startLocation, finishLocation) {
    var lat1 = startLocation.lat;
    var radianLat1 = lat1 * (Math.PI / 180);
    var lng1 = startLocation.lng;
    var radianLng1 = lng1 * (Math.PI / 180);
    var lat2 = finishLocation.lat;
    var radianLat2 = lat2 * (Math.PI / 180);
    var lng2 = finishLocation.lng;
    var radianLng2 = lng2 * (Math.PI / 180);
    var earth_radius = 3959; // or 6371 for kilometers
    var diffLat = (radianLat1 - radianLat2);
    var diffLng = (radianLng1 - radianLng2);
    var sinLat = Math.sin(diffLat / 2);
    var sinLng = Math.sin(diffLng / 2);
    var a = Math.pow(sinLat, 2.0) + Math.cos(radianLat1) * Math.cos(radianLat2) * Math.pow(sinLng, 2.0);
    var distance = earth_radius * 2 * Math.asin(Math.min(1, Math.sqrt(a)));
    return distance;
}

calcPoints = function() {
  var travelMethodPoints = travelMethodValue(Session.get('travelMethod'));
  var distance = Session.get('distanceTravelled');
  var percentageOfCommute = 100;
  return Math.floor((travelMethodPoints * distance * percentageOfCommute) / 10);
}

travelMethodValue = function(method) {
  switch(method) {
    case 'car':
      return 1;
    case 'carshare':
      return 1 * Session.get('carSharePassengers');
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

getCurrentLocation = function() {
  var currentLocation = {'lat': 0, 'lng': Math.random() / 100000};
   
  // if(navigator.geolocation) {
  //   var currentLocation = navigator.geolocation.watchPosition(showPosition, showError, {
  //       enableHighAccuracy: true,
  //       maximumAge: 60000,
  //       timeout: 27000
  //   })
  // }

  return currentLocation;
}

startTracking = function() {
  Session.set('isTracking', true);
  Session.set('startTime', new Date);
  var startLocation = getCurrentLocation();
  Session.set('startLocation', startLocation);
  timeInterval = Meteor.setInterval(timeCounter, 25);
  distanceInterval = Meteor.setInterval(distanceCounter, 75);
}

stopTracking = function() {
  Meteor.clearInterval(timeInterval);
  Meteor.clearInterval(distanceInterval);
  var points = calcPoints();
  Journeys.insert({
    userId: Meteor.userId(),
    travelMethod: Session.get('travelMethod'),
    date: moment(Session.get('startTime')).format('DD/MM/YY'),
    startTime: moment(Session.get('startTime')).unix(),
    endTime: moment().unix(),
    duration: calcDuration(Session.get('timeElapsed'), true),
    distance: Session.get('distanceTravelled').toFixed(5),
    points: points
  }, function() {
    Meteor.call('addPoints', points);
    Session.set('isTracking', false);
    Session.set('travelMethod', null);
    Session.set('startTime', null);
    Session.set('timeElapsed', null);
    Session.set('startLocation', null);
    Session.set('distanceTravelled', null);
  });
}