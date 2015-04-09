var directions={
  "*":"Alle Anrufe",
  "in":"Eingehende Anrufe",
  "out":"Ausgehende Anrufe"
};

var actions={
  "allow":" durchstellen",
  "deny":" ablehnen",
  "busy":" besetzt",
  "forward":" weiterleiten",
  "voicemail":" zur Voicemail"
};

Template.rules_item.helpers({
  humanReadable: function() {
    var readableText = "";
    readableText += directions[this.conditions.direction];

    if (this.conditions.number.to !== "*") {
      readableText += " auf "+formatNumber(this.conditions.number.to);
    } else if (this.conditions.number.from !== "*") {
      readableText += " von "+formatNumber(this.conditions.number.from);
    } else {
      readableText += " mit beliebigen Rufnummern";
    }

    readableText += actions[this.action.type];

    return readableText+".";
  }
});

Template.rules_item.events({
  'click .list-delete': function(event) {
    event.preventDefault();
    Meteor.call('removeRule', this._id);
  }
});
