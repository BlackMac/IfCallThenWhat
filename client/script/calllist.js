$(function () {
  $('[data-toggle="tooltip"]').tooltip();
  $('.dropdown-toggle').dropdown();
});

Template.onboarding_howto.helpers({
  apiUrl: function() {
    var userPath = window.location.href.split("/");
    userPath.splice(userPath.length-1, 0, "io");
    return userPath.join("/");
  }
});

Template.calllist.helpers({
  counter: function () {
    return Session.get('counter');
  },
  calls: function () {
    var userId = window.location.href.split("/").pop();
    return Calls.find({ user:userId }, { sort:{ datetime:-1 }});
  },
  onboarding: function() {
    return Session.get("onboarding")!==1;
  }
});

Template.phonecall.helpers({
  from: function(call) {
    return formatNumber(this.from);
  },

  to: function(call) {
    return formatNumber(this.to);
  },

  isOutgoing: function() {
    return this.direction === "out";
  }
});

Template.calllist.events({
  'click button.onboarding-0': function () {
    Session.set("onboarding", 1);
  },
  'click button.onboarding-1': function () {
    Session.set("onboarding", 0);
  }
});
