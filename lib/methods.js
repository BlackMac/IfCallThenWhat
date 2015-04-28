Meteor.methods({
  newRule: function (rule) {
    //rule['user'] = SessionToken.get();
    rule['datetime'] = new Date();
    Rules.insert(rule);
  },

  removeRule: function (rule) {
    Rules.remove(rule);
  },

  newAudioFile: function(file) {
    AudioFiles.remove({ user:file.user });
    file["datetime"] = new Date();
    AudioFiles.insert(file);
  },

  removeAudioFiles: function(id) {
    AudioFiles.remove({ _id:id });
  },

  setDefaultRouting: function(user, routing) {
    var rule = Rules.findOne({ user:user, "conditions" : { "direction" : "*", "number" : { "from" : "*", "to" : "*" }}});
    if (rule) Rules.remove(rule);
    var newRule = {
      "conditions" : {
        "direction" : "*",
        "number" : { "from" : "*", "to" : "*" }
      },
      "action" : {
        "type" : routing
      },
      "user" : user,
      "datetime" : new Date() };
    Rules.insert(newRule);
  }
});
