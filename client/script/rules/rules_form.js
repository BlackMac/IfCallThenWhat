Template.rules_form.events({
  'submit #rulesForm': function(event) {
    event.preventDefault();
    var numbersRule = $('#selectNumbers').val();
    var filterNumbers = {
      from: "*",
      to: "*"
    };

    var toNumbers = "*";

    if (numbersRule === "from") {
      filterNumbers.from = $('#filterNumbers').val();
    } else if (numbersRule === "to") {
      filterNumbers.to = $('#filterNumbers').val();
    }

    console.log(filterNumbers, "F");
    Meteor.call('newRule', {
      conditions: {
        direction:$("#selectDirection").val(),
        number:filterNumbers
      },
      action: {
        type: $("#rulesForm input[name='rulesAction']:checked").val()
      },
      user: SessionToken.get()
    });
  },

  'change #selectNumbers': function() {
    var selectField = $('#selectNumbers');
    if (selectField.val() !== "*") {
      $('#filterNumbers').val("");
      $('#filterNumbersGroup').removeClass("hidden");
    } else {
      $('#filterNumbers').val("*");
      $('#filterNumbersGroup').addClass("hidden");
    }
  }
});
