Calls = new Mongo.Collection("calls");
Config = new Mongo.Collection("config");

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
