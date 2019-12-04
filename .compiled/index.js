"use strict";

var _querystring = require("querystring");

var _fs = require("fs");

var _jsonwebtoken = require("jsonwebtoken");

var _jwkToPem = _interopRequireDefault(require("jwk-to-pem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var filePath = "".concat(__dirname, "/../resources/tokens.json");
var jwkFilePath = "".concat(__dirname, "/../resources/jwks.json");
console.log("".concat(filePath, " exist--: ").concat((0, _fs.existsSync)(filePath)));
var rawData = (0, _fs.readFileSync)(filePath);
var tokenData = JSON.parse(rawData);
var jwt = tokenData.id_token;
var jwksBuffer = (0, _fs.readFileSync)(jwkFilePath);
var jwks = JSON.parse(jwksBuffer);
var key = jwks.keys[0];
var pem = (0, _jwkToPem["default"])(key);
var TokenValidationErrors = {
  TokenExpiredError: "TokenExpiredError"
};
validateToken(jwt, pem).then(function (res) {
  console.log("jwt valid: ".concat(JSON.stringify(res, null, '\t')));
})["catch"](function (err) {
  console.error(err);
});

function validateToken(jwt, keyPem) {
  if (!jwt || jwt.length === 0) {
    return Promise.reject("empty");
  }

  var _jwt$split = jwt.split("."),
      _jwt$split2 = _slicedToArray(_jwt$split, 3),
      keyPart = _jwt$split2[0],
      dataPart = _jwt$split2[1],
      signaturePart = _jwt$split2[2];

  if (!dataPart || !signaturePart) {
    return Promise.reject("bad format");
  }

  console.log("keyPart, dataPart, signaturePart: ".concat(keyPart, "\r\n").concat(dataPart, "\r\n").concat(signaturePart));
  return new Promise(function (resolve, reject) {
    (0, _jsonwebtoken.verify)(jwt, keyPem, function (err, decoded) {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
}
//# sourceMappingURL=index.js.map