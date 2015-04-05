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
