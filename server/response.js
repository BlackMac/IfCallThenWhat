ResponseIo = {
  get: function(callInfo) {
    var response = '<?xml version="1.0" encoding="UTF-8"?><Response>';

    var rules = Rules.find({
        user:SessionToken.get()
      },
      {
        sort:{ datetime:1 }
      }
    );

    var responseAction = "";
    var appliedRule = null;
    rules.forEach(function(rule) {
      if (ResponseIo._ruleApplies(rule, callInfo)) {
        appliedRule = rule._id;

        if (rule && rule.action.type === "voicemail") {
          responseAction="<Dial><Voicemail /></Dial>";
        } else if (rule && rule.action.type === "deny") {
          responseAction="<Reject />";
        } else if (rule && rule.action.type === "busy") {
          responseAction='<Reject reason="busy"/>';
        } else {
          appliedRule = null;
        }
      }
    });
    response += responseAction+'</Response>'+"\n";
    return {
      response: response,
      ruleId: appliedRule
    };
  },

  _ruleApplies: function(rule, callInfo) {
    if (ResponseIo._isWildcardRule(rule)) {
      return true;
    }
    if (rule.conditions.direction !== "*"
        && rule.conditions.direction !== callInfo.direction) {
      return false;
    }
    if (rule.conditions.number.from !== "*"
        && rule.conditions.number.from !== callInfo.from) {
      return false;
    }
    if (rule.conditions.number.to !== "*"
        && rule.conditions.number.to !== callInfo.to) {
      return false;
    }
    return true;
  },

  _isWildcardRule: function(rule) {
    if (rule.conditions.direction === "*"
        && rule.conditions.number.from === "*"
        && rule.conditions.number.to === "*") {
      return true;
    }
  }
};
