"use strict";

var _regeneratorRuntime = require("@babel/runtime/regenerator");
var _asyncToGenerator = require("@babel/runtime/helpers/asyncToGenerator");
var fetch = require("node-fetch");
var fs = require("fs");
var AdmZip = require("adm-zip");
var toBuffer = function toBuffer(ab) {
  var buf = Buffer.alloc(ab.byteLength);
  var view = new Uint8Array(ab);
  for (var i = 0; i < buf.length; ++i) {
    buf[i] = view[i];
  }
  return buf;
};
var getContent = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    var _process$env, _process$env2, _process$env3;
    var API_KEY, API_SERVER, WRITE_PATH, res, buffer, zip;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          // get environment variables
          API_KEY = (_process$env = process.env) === null || _process$env === void 0 ? void 0 : _process$env.CONTENT_API_KEY;
          if (!API_KEY) {
            console.log("CONTENT_API_KEY is not set");
            process.exit(1);
          }
          API_SERVER = (_process$env2 = process.env) === null || _process$env2 === void 0 ? void 0 : _process$env2.CONTENT_API_SERVER;
          if (!API_SERVER) {
            console.log("CONTENT_API_SERVER is not set");
            process.exit(1);
          }
          WRITE_PATH = (_process$env3 = process.env) === null || _process$env3 === void 0 ? void 0 : _process$env3.CONTENT_WRITE_PATH;
          if (!WRITE_PATH) {
            console.log("CONTENT_WRITE_PATH is not set");
            process.exit(1);
          }

          // fetch zip file
          _context.next = 8;
          return fetch("".concat(API_SERVER, "/marketing/api/get-all-content"), {
            method: "GET",
            headers: {
              "X-ContentApiKey": API_KEY
            }
          });
        case 8:
          res = _context.sent;
          _context.next = 11;
          return res.arrayBuffer();
        case 11:
          buffer = _context.sent;
          // write zip file to disk
          fs.writeFileSync("".concat(WRITE_PATH, "/content.zip"), toBuffer(buffer));

          // unzip file
          zip = new AdmZip("".concat(WRITE_PATH, "/content.zip"));
          zip.extractAllTo("".concat(WRITE_PATH, "/content"), true);
        case 15:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function getContent() {
    return _ref.apply(this, arguments);
  };
}();
module.exports = getContent;