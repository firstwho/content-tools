"use strict";

var _regeneratorRuntime = require("@babel/runtime/regenerator");
var _asyncToGenerator = require("@babel/runtime/helpers/asyncToGenerator");
var getContent = require("./get-content.js");
(function () {
  var run = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return getContent();
          case 2:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function run() {
      return _ref.apply(this, arguments);
    };
  }();
  run();
})();