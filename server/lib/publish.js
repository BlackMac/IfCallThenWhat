Meteor.publish("calls-for-token", function (token) {
  SessionToken.set(token);
  return Calls.find({ user: token }, { fields: {}});
});

Meteor.publish("rules-for-token", function (token) {
  SessionToken.set(token);
  return Rules.find({ user: token }, { fields: {}});
});
