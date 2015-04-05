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
    return Calls.find({ user:SessionToken.get() }, { sort:{ datetime:-1 }});
  }
});
