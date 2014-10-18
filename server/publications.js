// Publish an organisation's staff list
// Meteor.publish('collection', function () {
//   var data = Collection.find({});
//   return data;
// });

Meteor.publish('userJourneys', function () {
  return Journeys.find({_id: this.userId});
});