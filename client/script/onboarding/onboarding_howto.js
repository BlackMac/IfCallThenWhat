Template.onboarding_howto.helpers({
  apiUrl: function() {
    var userPath = window.location.href.split("/");
    userPath.splice(userPath.length-1, 0, "io");
    return userPath.join("/");
  }
});
