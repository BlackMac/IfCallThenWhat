Meteor.methods({
  newRule: function (rule) {
    //rule['user'] = SessionToken.get();
    rule['datetime'] = new Date();
    Rules.insert(rule);
  },

  removeRule: function (rule) {
    Rules.remove(rule);
  }
});