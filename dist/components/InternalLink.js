"use strict";

var React = require("react");
// .env should include NEXT_PUBLIC_LIFECYCLE=$npm_lifecycle_event
var InternalLink = exports.InternalLink = function InternalLink(_ref) {
  var _process$env;
  var href = _ref.href,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? "" : _ref$className,
    _ref$target = _ref.target,
    target = _ref$target === void 0 ? "_self" : _ref$target,
    _ref$tabIndex = _ref.tabIndex,
    tabIndex = _ref$tabIndex === void 0 ? 0 : _ref$tabIndex,
    children = _ref.children;
  if (((_process$env = process.env) === null || _process$env === void 0 ? void 0 : _process$env.NEXT_PUBLIC_LIFECYCLE) === "build") href = "".concat(href, ".html");
  return /*#__PURE__*/React.createElement("a", {
    href: href,
    target: target,
    className: className,
    tabIndex: tabIndex
  }, children);
};