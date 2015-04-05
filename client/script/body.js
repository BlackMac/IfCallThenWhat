$(function () {
  //$('.collapse').collapse();
  $('[data-toggle="tooltip"]').tooltip();
});


Template.body.helpers({
  calls: function () {
    var userId = window.location.href.split("/").pop();
    var calls = Calls.find({ user:userId }, { sort:{ datetime:-1 }});
    return calls;
  }
});
