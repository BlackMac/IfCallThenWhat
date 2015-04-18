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
    AudioFiles.insert(file);
  }
});

AudioFiles.allow({
  insert:function(userId,project){
    return true;
  },
  update:function(userId,project,fields,modifier){
   return true;
  },
  remove:function(userId,project){
    return true;
  }
});
