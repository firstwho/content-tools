"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InternalLink = void 0;
var _react = _interopRequireDefault(require("react"));
// .env should include NEXT_PUBLIC_LIFECYCLE=$npm_lifecycle_event
const InternalLink = _ref => {
  let {
    href,
    className = "",
    target = "_self",
    tabIndex = 0,
    children
  } = _ref;
  if (process.env.NEXT_PUBLIC_LIFECYCLE === "build") href = "".concat(href, ".html");
  return /*#__PURE__*/_react.default.createElement("a", {
    href: href,
    target: target,
    className: className,
    tabIndex: tabIndex
  }, children);
};
exports.InternalLink = InternalLink;