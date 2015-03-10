var Calls = new Mongo.Collection("calls");
var Config = new Mongo.Collection("config");

if (Meteor.isClient) {
  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })

  Template.calllist.helpers({
    counter: function () {
      return Session.get('counter');
    },
    calls: function () {
      var userId = window.location.href.split("/").pop()
      return Calls.find({user:userId});
    },
    apiUrl: function() {
      var userPath = window.location.href.split("/")
      userPath.splice(userPath.length-1,0,"io");
      return userPath.join("/");
    },
    onboarding: function() {
      return Session.get("onboarding")!==1;
    }
  });

  Template.calllist.events({
    'click button.onboarding-0': function () {
      Session.set("onboarding", 1);
    },
    'click button.onboarding-1': function () {
      Session.set("onboarding", 0);
    }
  });

}

if (Meteor.isServer) {
  WebApp.connectHandlers
  .use(function(req, res, next) {
    if (req.url == '/') {
      // 307 Temporary Redirect
      var userId = ServerSession.get("userId");
      if (!userId) {
        userId = Random.id();
      }
      ServerSession.set("userId",userId);
      res.writeHead(307, {
        'Location': '/' + userId
      });
      res.end();
    } else {
      // Let other handlers match
      next();
    }
  });

  //console.log(HTTP.location);
  HTTP.methods({
    'io/:userId': function(data) {
      if (typeof data !== "undefined") {
        var post = parsePost(data.toString());

        var reject = Config.find({
          action: "deny_in",
          user: this.params.userId,
          $or: [
            {number:"4921163556455"},
            {number:""}
          ]
        });

        Calls.insert({
          user: this.params.userId,
          from: post.from,
          to: post.to,
          direction: post.direction,
          active: false,
          rejected: reject.count()>0,
          datetime: new Date()
        });

        this.setContentType('application/xml');

        if (reject.count()>0) {
          return '<?xml version="1.0" encoding="UTF-8"?><Response><Reject /></Response>';
        }
        return '<?xml version="1.0" encoding="UTF-8"?><Response></Response>';
      }
    }
  });

  Meteor.startup(function () {
    // code to run on server at startup
  });
}
