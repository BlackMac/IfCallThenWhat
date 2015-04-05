Template.rules_form.events({
  'submit #rulesForm': function(event) {
    event.preventDefault();
    Rules.insert({
      conditions: {
        direction:"*",
        number:{
          from:"*",
          to:"*"
        }
      },
      action: {
        type: $("#rulesForm input[name='rulesAction']:checked").val()
      },
      datetime: new Date()
    });
  }
});
