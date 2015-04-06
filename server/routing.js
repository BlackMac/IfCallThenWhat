WebApp.connectHandlers
.use(function(req, res, next) {
  // 307 Temporary Redirect
  var token = SessionToken.get(req.url);
  if (token === null) {
    token = SessionToken.generate();
  }

  if (req.url !== '/'+token) {
    res.writeHead(307, {
      'Location': '/' + token
    });
    res.end();
  }
  next();
});

HTTP.methods({
  'io/:userId': {
    post: function(data) {

      if (typeof data !== "undefined") {
        var post = parsePost(data.toString());
        var responseObject = ResponseIo.get(post);

        Calls.update({ active:true }, { $set: { active:false }});
        Calls.insert({
          user: this.params.userId,
          from: post.from,
          to: post.to,
          direction: post.direction,
          active: false,
          rejected: false, //reject.count()>0,
          datetime: new Date(),
          rule: responseObject.ruleId
        });
        this.setContentType('application/xml');
        return responseObject.response;
      } else {
        this.setContentType('application/xml');
        return '<?xml version="1.0" encoding="UTF-8"?><Response><!--empty request--></Response>';
      }
    }
  }
});
