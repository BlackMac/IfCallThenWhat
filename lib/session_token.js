SessionToken = {
  get: function(url) {
    var token ="";
    if (Meteor.isClient) {
      token = window.location.href.split("/").pop();
    } else if (Meteor.isServer) {
      if (url) {
        token = url.split("/").pop();
        if (SessionToken.validate(token)) {
          SessionToken.set(token);
        }
      }
      token = ServerSession.get("token");
    }
    if (!token) return null;

    token = token.replace(/[#/][^\s]*/gi, "");

    if (!SessionToken.validate(token)) return null;
    return token;
  },
  set: function(token) {
    if (Meteor.isClient) {
      throw "Session Token can only be set on the server";
    }
    ServerSession.set("token", token);
  },
  validate: function(token) {
    return token.match(/^[0-9a-z]{17}$/i) !== null;
  },
  generate: function() {
    var token = Random.id();
    SessionToken.set(token);
    return token;
  }
};
