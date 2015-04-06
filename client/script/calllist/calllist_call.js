Template.calllist_call.helpers({
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

Template.calllist_call.events({
  'mouseover .call-item': function() {
    $('#ruleId'+this.rule).addClass("list-group-item-success");
  },
  'mouseout .call-item': function() {
    $('#ruleId'+this.rule).removeClass("list-group-item-success");
  }
});
