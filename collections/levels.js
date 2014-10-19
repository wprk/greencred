Levels = new Meteor.Collection('levels');

if (Meteor.isClient) {
	Meteor.subscribe("allLevels");
}
