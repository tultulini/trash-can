"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatString = formatString;

function formatString(value) {
  var result = value;

  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  for (var i in args) {
    var param = new RegExp("{[".concat(i, "]}"), 'g');
    result = result.replace(param, args[i]);
  }

  return result;
}
//# sourceMappingURL=strings.js.map