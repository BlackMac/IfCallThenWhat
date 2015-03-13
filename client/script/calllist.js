$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

Template.calllist.helpers({
  counter: function () {
    return Session.get('counter');
  },
  calls: function () {
    var userId = window.location.href.split("/").pop();
    return Calls.find({ user:userId });
  },
  apiUrl: function() {
    var userPath = window.location.href.split("/");
    userPath.splice(userPath.length-1, 0, "io");
    return userPath.join("/");
  },
  onboarding: function() {
    return Session.get("onboarding")!==1;
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
