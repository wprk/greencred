Journeys = new Meteor.Collection('journeys');

if (Meteor.isClient) {
	Meteor.subscribe("userJourneys");
}
