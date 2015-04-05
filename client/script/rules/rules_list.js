Template.rules_list.helpers({
  rules: function () {
    var userId = window.location.href.split("/").pop();
    return Rules.find({}, { sort:{ datetime:-1 }});
  }
});
