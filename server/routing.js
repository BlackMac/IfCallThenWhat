WebApp.connectHandlers
.use(function(req, res, next) {
  if (req.url === '/') {
    // 307 Temporary Redirect
    var userId = ServerSession.get("userId");
    if (!userId) {
      userId = Random.id();
    }
    ServerSession.set("userId", userId);
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
          { number:"4921163556455" },
          { number:"" }
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
