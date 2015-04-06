Tracker.autorun(function () {
  Meteor.subscribe("calls-for-token", SessionToken.get());
  Meteor.subscribe("rules-for-token", SessionToken.get());
});
