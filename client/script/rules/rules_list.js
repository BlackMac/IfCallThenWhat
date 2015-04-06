Template.rules_list.helpers({
  rules: function () {
    var userId = window.location.href.split("/").pop();
    return Rules.find({ user: SessionToken.get() }, { sort:{ datetime:-1 }});
  }
});
