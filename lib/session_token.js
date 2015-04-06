SessionToken = {
  _activeSessionToken: null,

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
      if (!token) token = SessionToken._activeSessionToken;
    }
    if (!token) return null;

    token = token.replace(/[#/][^\s]*/gi, "");

    if (!SessionToken.validate(token)) return null;
    SessionToken.set(token);
    return token;
  },
  set: function(token) {
    SessionToken._activeSessionToken = token.trim();
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
