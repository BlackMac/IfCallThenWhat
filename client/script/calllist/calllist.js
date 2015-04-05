$(function () {
  $('[data-toggle="tooltip"]').tooltip();
  $('.dropdown-toggle').dropdown();
});


Template.calllist.helpers({
  counter: function () {
    return Session.get('counter');
  },
  onboarding: function() {
    return Session.get("onboarding")!==1;
  },
  calls: function () {
    var userId = window.location.href.split("/").pop();
    return Calls.find({ user:userId }, { sort:{ datetime:-1 }});
  }
});
