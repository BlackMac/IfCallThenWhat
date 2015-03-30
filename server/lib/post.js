parsePost = function(input) {
  var result = {};
  var parts = input.split("&");
  parts.forEach(function(part) {
    var divided = part.split("=");
    result[divided[0]] = divided[1];
  });
  return result;
};
