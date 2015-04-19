var childProcess = Npm.require('child_process');
var fs = Npm.require('fs');

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
  } else {
    next();
  }
});
HTTP.methods({
  'wav/:userId': function(data) {
    SessionToken.set(this.params.userId);
    wav = AudioFiles.findOne({ user:SessionToken.get() });

    var filename = '/tmp/'+SessionToken.get()+".wav";
    fs.writeFileSync(filename, new Buffer(wav.audio.file));
    childProcess.exec('sox '+filename+' -t wavpcm - rate 8000 channels 1'+ ' 2>&1 1>output && echo done! > done');
    while (!fs.existsSync('done')) {
    // Do nothing
    }
    var content = fs.readFileSync('output');
    fs.unlinkSync('output');
    fs.unlinkSync('done');
    console.log('It\'s saved!');

    //return EJSON.stringify(wav);
    this.setContentType('audio/wav');
    return content;
  },

  'io/:userId': {
    post: function(data) {
      SessionToken.set(this.params.userId);
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
          rejected: false,
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
