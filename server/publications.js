// Publish an organisation's staff list
Meteor.publish("userData", function () {
    return Meteor.users.find({_id: this.userId},
        {fields: {'emails': 1, 'points': 1, 'level': 1}});
});

Meteor.publish('userJourneys', function publishFunction() {
  return Journeys.find({userId: this.userId});
});

Meteor.publish("allLevels", function () {
    return Meteor.users.find();
});