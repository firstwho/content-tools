"use strict";
"use client";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DoContentSections = exports.ContentSections = exports.CONTENT_TYPE_TEXT_RIGHT = exports.CONTENT_TYPE_TEXT_LEFT = exports.CONTENT_TYPE_TEXT_IMAGE_RIGHT = exports.CONTENT_TYPE_TEXT_IMAGE_LEFT = exports.CONTENT_TYPE_TEXT_CENTER = exports.CONTENT_TYPE_SIGN_UP = exports.CONTENT_TYPE_IMAGE_RIGHT = exports.CONTENT_TYPE_IMAGE_LEFT = exports.CONTENT_TYPE_IMAGE_FULL = exports.CONTENT_TYPE_IMAGE_CENTER = exports.CONTENT_TYPE_DIVIDER = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
var _fa = require("react-icons/fa");
var _copyToClipboard = _interopRequireDefault(require("copy-to-clipboard"));
var _reactHotToast = _interopRequireDefault(require("react-hot-toast"));
var _reactScrollIntoView = _interopRequireDefault(require("react-scroll-into-view"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var CONTENT_TYPE_TEXT_LEFT = exports.CONTENT_TYPE_TEXT_LEFT = "text-only-left";
var CONTENT_TYPE_TEXT_RIGHT = exports.CONTENT_TYPE_TEXT_RIGHT = "text-only-right";
var CONTENT_TYPE_TEXT_CENTER = exports.CONTENT_TYPE_TEXT_CENTER = "text-only-center";
var CONTENT_TYPE_TEXT_IMAGE_LEFT = exports.CONTENT_TYPE_TEXT_IMAGE_LEFT = "text-with-left-image";
var CONTENT_TYPE_TEXT_IMAGE_RIGHT = exports.CONTENT_TYPE_TEXT_IMAGE_RIGHT = "text-with-right-image";
var CONTENT_TYPE_IMAGE_LEFT = exports.CONTENT_TYPE_IMAGE_LEFT = "image-only-left";
var CONTENT_TYPE_IMAGE_RIGHT = exports.CONTENT_TYPE_IMAGE_RIGHT = "image-only-right";
var CONTENT_TYPE_IMAGE_CENTER = exports.CONTENT_TYPE_IMAGE_CENTER = "image-only-center";
var CONTENT_TYPE_IMAGE_FULL = exports.CONTENT_TYPE_IMAGE_FULL = "image-only-full";
var CONTENT_TYPE_DIVIDER = exports.CONTENT_TYPE_DIVIDER = "divider";
var CONTENT_TYPE_SIGN_UP = exports.CONTENT_TYPE_SIGN_UP = "sign-up";

// NOTE localFont is NextJS font object

var useScript = function useScript(url) {
  (0, _react.useEffect)(function () {
    if (!url) return;
    var script = document.createElement("script");
    script.src = url;
    script.async = true;
    document.body.appendChild(script);
    return function () {
      document.body.removeChild(script);
    };
  }, [url]);
};
var useOnScreen = function useOnScreen(ref, setActiveHeader, anchor) {
  (0, _react.useEffect)(function () {
    var observer = new IntersectionObserver(function (_ref) {
      var _ref2 = (0, _slicedToArray2["default"])(_ref, 1),
        entry = _ref2[0];
      if (entry.isIntersecting === true) setActiveHeader(anchor);
    }, {
      rootMargin: "0px 0px -300px 0px"
    });
    observer.observe(ref.current);
    return function () {
      observer.disconnect();
    };
  }, [ref, anchor, setActiveHeader]);
};
var TocItem = function TocItem(_ref3) {
  var id = _ref3.id,
    heading = _ref3.heading,
    showHeading = _ref3.showHeading,
    editCallback = _ref3.editCallback,
    deleteCallback = _ref3.deleteCallback,
    buttonClasses = _ref3.buttonClasses,
    offset = _ref3.offset,
    activeUntil = _ref3.activeUntil,
    matched = _ref3.matched,
    visibleSections = _ref3.visibleSections,
    localFont = _ref3.localFont,
    showMeter = _ref3.showMeter;
  var _useState = (0, _react.useState)(false),
    _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
    isHovering = _useState2[0],
    setIsHovering = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
    isDeleting = _useState4[0],
    setIsDeleting = _useState4[1];
  return /*#__PURE__*/_react["default"].createElement("li", {
    className: "flex items-center relative ".concat(isHovering && editCallback ? "bg-gray-100 rounded-md" : "", " ").concat(editCallback ? "-ml-2 px-2" : ""),
    onMouseEnter: function onMouseEnter() {
      return setIsHovering(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setIsHovering(false);
    }
  }, showMeter && offset === 0 && /*#__PURE__*/_react["default"].createElement("div", {
    className: "absolute h-1/2 w-4 top-0 -left-2 bg-white z-10"
  }), showMeter && offset === visibleSections.length - 1 && /*#__PURE__*/_react["default"].createElement("div", {
    className: "absolute h-1/2 w-4 bottom-0 -left-2 bg-white z-10"
  }), showMeter && /*#__PURE__*/_react["default"].createElement("div", {
    className: "".concat(matched && offset <= activeUntil ? "bg-slate-700" : "bg-white", " shrink-0 rounded-full w-3 h-3 border-slate-800 border-2 -ml-[7px] z-20")
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-col"
  }, /*#__PURE__*/_react["default"].createElement(_reactScrollIntoView["default"], {
    selector: "#heading-".concat(id)
  }, /*#__PURE__*/_react["default"].createElement("div", {
    href: "#heading-".concat(id),
    className: "".concat(isHovering || matched && offset <= activeUntil ? "text-slate-800" : "text-gray-500", " ").concat(localFont.className, " grow ").concat(showMeter ? "pl-4" : "", " pr-2 space-x-2 hover:text-gray-900 text-lg cursor-pointer ").concat(showHeading ? "" : "opacity-50")
  }, heading)), isHovering && editCallback && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "".concat(showMeter ? "pl-4" : "", " pr-2 flex gap-x-2 mt-1 mb-2")
  }, /*#__PURE__*/_react["default"].createElement("span", {
    onClick: function onClick() {
      return editCallback(id);
    },
    className: buttonClasses
  }, "Edit"), /*#__PURE__*/_react["default"].createElement("span", {
    onClick: function onClick() {
      return setIsDeleting(!isDeleting);
    },
    className: buttonClasses
  }, "Delete")), isDeleting && /*#__PURE__*/_react["default"].createElement("div", {
    className: "bg-white p-4 flex flex-col gap-y-4 rounded-md my-2"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "font-semibold"
  }, "Are you sure you want to delete this section?"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex gap-x-4"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    onClick: function onClick() {
      return setIsDeleting(false);
    },
    className: "cursor-pointer rounded-md bg-gray-200 px-2.5 py-1.5 text-base font-semibold text-gray-900 shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-200"
  }, "Cancel"), /*#__PURE__*/_react["default"].createElement("span", {
    onClick: /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return deleteCallback({
              id: id
            });
          case 2:
          case "end":
            return _context.stop();
        }
      }, _callee);
    })),
    className: "cursor-pointer rounded-md bg-red-600 px-2.5 py-1.5 text-base font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
  }, "Delete"))))));
};
var TableOfContents = function TableOfContents(_ref5) {
  var sections = _ref5.sections,
    activeHeader = _ref5.activeHeader,
    localFont = _ref5.localFont,
    showInvisibleHeaders = _ref5.showInvisibleHeaders,
    showMeter = _ref5.showMeter;
  var visibleSections = showInvisibleHeaders ? sections : sections.filter(function (_ref6) {
    var showHeading = _ref6.show_heading;
    return showHeading === true;
  });
  var _ref7 = activeHeader === null ? [false, -1] : visibleSections.reduce(function (_ref9, _ref10, offset) {
      var _ref11 = (0, _slicedToArray2["default"])(_ref9, 2),
        isMatched = _ref11[0],
        matchedOffset = _ref11[1];
      var id = _ref10.id;
      if (isMatched) return [isMatched, matchedOffset];
      if ("heading-".concat(id) === activeHeader) return [true, offset];
      return [false, -1];
    }, [false, -1]),
    _ref8 = (0, _slicedToArray2["default"])(_ref7, 2),
    matched = _ref8[0],
    activeUntil = _ref8[1];
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "col-span-12 md:col-span-1"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "sticky top-[95px] hidden lg:block"
  }, /*#__PURE__*/_react["default"].createElement("h3", {
    className: "".concat(localFont.className, " -ml-1 mb-3 text-xl font-semibold text-slate-700")
  }, "Contents"), /*#__PURE__*/_react["default"].createElement("ul", {
    className: "mt-2 lg:mt-4 lg:space-y-4 ".concat(showMeter ? "border-l-2 border-slate-700" : "")
  }, visibleSections.length > 0 && visibleSections.map(function (_ref12, offset) {
    var id = _ref12.id,
      heading = _ref12.heading,
      showHeading = _ref12.show_heading,
      editCallback = _ref12.editCallback,
      deleteCallback = _ref12.deleteCallback,
      buttonClasses = _ref12.buttonClasses;
    return /*#__PURE__*/_react["default"].createElement(TocItem, {
      matched: matched,
      activeUntil: activeUntil,
      key: id,
      id: id,
      heading: heading,
      showHeading: showHeading,
      offset: offset,
      visibleSections: visibleSections,
      localFont: localFont,
      editCallback: editCallback,
      deleteCallback: deleteCallback,
      buttonClasses: buttonClasses,
      showMeter: showMeter
    });
  }))));
};
var Heading = function Heading(_ref13) {
  var title = _ref13.title,
    _ref13$level = _ref13.level,
    level = _ref13$level === void 0 ? 2 : _ref13$level,
    anchor = _ref13.anchor,
    setActiveHeader = _ref13.setActiveHeader,
    localFont = _ref13.localFont;
  var ref = (0, _react.useRef)();
  useOnScreen(ref, setActiveHeader, anchor);
  if (level === 1) return /*#__PURE__*/_react["default"].createElement("h1", {
    ref: ref,
    className: "".concat(localFont.className, " mb-2 text-base font-semibold xl:mb-4 xl:text-4xl")
  }, title);
  if (level === 2) return /*#__PURE__*/_react["default"].createElement("h2", {
    onClick: function onClick() {
      (0, _copyToClipboard["default"])(window.location.origin + window.location.pathname + "#".concat(anchor));
      _reactHotToast["default"].success("Link copied to clipboard", {
        position: "bottom-center"
      });
    },
    ref: ref,
    className: "".concat(localFont.className, " cursor-pointer mt-4 text-2xl font-semibold xl:mb-2 xl:text-3xl flex items-center text-slate-700 hover:text-slate-900")
  }, /*#__PURE__*/_react["default"].createElement("div", null, title), /*#__PURE__*/_react["default"].createElement("div", {
    className: "rounded-full bg-gray-100 p-1 ml-2"
  }, /*#__PURE__*/_react["default"].createElement(_fa.FaLink, {
    className: "h-4 w-4 text-gray-500"
  })));
  if (level === 3) return /*#__PURE__*/_react["default"].createElement("h3", {
    ref: ref,
    className: "".concat(localFont.className, " mb-2 text-md font-semibold xl:mb-4 xl:text-2xl")
  }, title);
  if (level === 4) return /*#__PURE__*/_react["default"].createElement("h4", {
    ref: ref,
    className: "".concat(localFont.className, " mb-2 text-base font-semibold xl:mb-4 xl:text-xl")
  }, title);
  if (level === 5) return /*#__PURE__*/_react["default"].createElement("h5", {
    ref: ref,
    className: "".concat(localFont.className, " mb-2 text-base font-semibold xl:mb-4")
  }, title);
  return null;
};
var TextLeft = function TextLeft(_ref14) {
  var content = _ref14.content;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "leading-loose prose lg:prose-lg max-w-max",
    dangerouslySetInnerHTML: {
      __html: content
    }
  });
};
var TextRight = function TextRight(_ref15) {
  var content = _ref15.content;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-right leading-loose prose lg:prose-lg max-w-max",
    dangerouslySetInnerHTML: {
      __html: content
    }
  });
};
var TextCenter = function TextCenter(_ref16) {
  var content = _ref16.content;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-center leading-loose prose lg:prose-lg max-w-max",
    dangerouslySetInnerHTML: {
      __html: content
    }
  });
};
var ImageOnLeft = function ImageOnLeft(_ref17) {
  var content = _ref17.content,
    imageUrl = _ref17.imageUrl,
    _ref17$colSpanContent = _ref17.colSpanContent,
    colSpanContent = _ref17$colSpanContent === void 0 ? "col-span-12 md:col-span-6" : _ref17$colSpanContent,
    _ref17$colSpanImage = _ref17.colSpanImage,
    colSpanImage = _ref17$colSpanImage === void 0 ? "col-span-12 md:col-span-6" : _ref17$colSpanImage;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "grid grid-cols-12 gap-4"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: colSpanImage
  }, /*#__PURE__*/_react["default"].createElement("img", {
    src: imageUrl,
    alt: ""
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "".concat(colSpanContent, " leading-loose prose lg:prose-lg max-w-max"),
    dangerouslySetInnerHTML: {
      __html: content
    }
  }));
};
var ImageOnRight = function ImageOnRight(_ref18) {
  var content = _ref18.content,
    imageUrl = _ref18.imageUrl,
    _ref18$colSpanContent = _ref18.colSpanContent,
    colSpanContent = _ref18$colSpanContent === void 0 ? "w-full" : _ref18$colSpanContent,
    _ref18$colSpanImage = _ref18.colSpanImage,
    colSpanImage = _ref18$colSpanImage === void 0 ? "w-full md:w-1/2" : _ref18$colSpanImage,
    _ref18$ctaContent = _ref18.ctaContent,
    ctaContent = _ref18$ctaContent === void 0 ? null : _ref18$ctaContent;
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("img", {
    src: imageUrl,
    alt: "",
    className: "".concat(colSpanImage, " float-none md:float-right ml-0 md:ml-8 mb-4")
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "".concat(colSpanContent, " leading-loose prose lg:prose-lg max-w-max"),
    dangerouslySetInnerHTML: {
      __html: content
    }
  }), ctaContent);
};
var ImageCenter = function ImageCenter(_ref19) {
  var imageUrl = _ref19.imageUrl,
    height = _ref19.height,
    width = _ref19.width;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex justify-center"
  }, /*#__PURE__*/_react["default"].createElement("img", {
    src: imageUrl,
    height: height,
    width: width,
    alt: ""
  }));
};
var ImageCenterFull = function ImageCenterFull(_ref20) {
  var imageUrl = _ref20.imageUrl;
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("img", {
    className: "object-fill",
    src: imageUrl,
    alt: ""
  }));
};
var ImageLeft = function ImageLeft(_ref21) {
  var imageUrl = _ref21.imageUrl,
    height = _ref21.height,
    width = _ref21.width;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex justify-start"
  }, /*#__PURE__*/_react["default"].createElement("img", {
    src: imageUrl,
    height: height,
    width: width,
    alt: ""
  }));
};
var ImageRight = function ImageRight(_ref22) {
  var imageUrl = _ref22.imageUrl,
    height = _ref22.height,
    width = _ref22.width;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex justify-end"
  }, /*#__PURE__*/_react["default"].createElement("img", {
    src: imageUrl,
    height: height,
    width: width,
    alt: ""
  }));
};
var Section = function Section(_ref23) {
  var sectionOut = _ref23.sectionOut,
    id = _ref23.id,
    headingOut = _ref23.headingOut,
    scripts = _ref23.scripts;
  useScript((scripts === null || scripts === void 0 ? void 0 : scripts[0]) || false);
  return /*#__PURE__*/_react["default"].createElement("section", {
    key: id,
    className: "pt-0 pb-6"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "relative"
  }, /*#__PURE__*/_react["default"].createElement("a", {
    className: "absolute -top-10",
    id: "heading-".concat(id),
    name: "heading-".concat(id)
  })), headingOut, sectionOut);
};
var CTAButton = function CTAButton(_ref24) {
  var label = _ref24.label,
    url = _ref24.url;
  return /*#__PURE__*/_react["default"].createElement("a", {
    href: url,
    className: "rounded-md bg-indigo-600 px-3.5 py-2.5 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
  }, label);
};
var CTALink = function CTALink(_ref25) {
  var label = _ref25.label,
    url = _ref25.url;
  return /*#__PURE__*/_react["default"].createElement("a", {
    href: url,
    className: "text-sm font-semibold leading-6 text-gray-900"
  }, label);
};
var CTAForm = function CTAForm(_ref26) {
  var iframeUrl = _ref26.iframeUrl,
    type = _ref26.type,
    formOrientation = _ref26.formOrientation;
  var classes = "";
  switch ("".concat(type, "__").concat(formOrientation)) {
    case "form-email__vertical":
      classes = "w-full h-36";
      break;
    case "form-email-name__vertical":
      classes = "w-full h-64";
      break;
    case "form-scheduling__vertical":
      classes = "w-full h-64";
      break;
    case "form-email__horizontal":
      classes = "w-full h-20";
      break;
    case "form-email-name__horizontal":
      classes = "w-full h-20";
      break;
    case "form-scheduling__horizontal":
      classes = "w-full h-20";
      break;
  }
  return /*#__PURE__*/_react["default"].createElement("iframe", {
    src: iframeUrl,
    className: classes,
    sandbox: "allow-top-navigation allow-scripts allow-forms"
  });
};
var CTASection = function CTASection(_ref27) {
  var id = _ref27.id,
    image = _ref27.image,
    _ref27$ctaData = _ref27.ctaData,
    ctaData = _ref27$ctaData === void 0 ? {} : _ref27$ctaData,
    content = _ref27.content;
  var primaryLabel = ctaData.cta_primary,
    primaryType = ctaData.cta_primary_type,
    primaryUrl = ctaData.cta_primary_url,
    secondaryLabel = ctaData.cta_secondary,
    secondaryType = ctaData.cta_secondary_type,
    secondaryUrl = ctaData.cta_secondary_url,
    jobId = ctaData.job_id,
    workflowStepId = ctaData.workflow_step_id,
    iframeUrl = ctaData.url,
    formOrientation = ctaData.cta_form_orientation;
  var imageUrl = image && image !== null && image !== void 0 && image.url ? image.url : null;
  var ctas = [{
    id: "id-".concat(id, "-cta-primary"),
    type: primaryType,
    label: primaryLabel,
    url: primaryUrl
  }, {
    id: "id-".concat(id, "-cta-secondary"),
    type: secondaryType,
    label: secondaryLabel,
    url: secondaryUrl
  }];
  var ctaContent = /*#__PURE__*/_react["default"].createElement("div", {
    className: "mt-10 flex items-center gap-x-6 bg-amber-100 p-2 rounded-lg"
  }, ctas.map(function (_ref28) {
    var id = _ref28.id,
      type = _ref28.type,
      label = _ref28.label,
      url = _ref28.url;
    if (type === "button") return /*#__PURE__*/_react["default"].createElement(CTAButton, {
      key: id,
      label: label,
      url: url
    });
    if (type === "link") return /*#__PURE__*/_react["default"].createElement(CTALink, {
      key: id,
      label: label,
      url: url
    });
    return /*#__PURE__*/_react["default"].createElement(CTAForm, {
      type: type,
      formOrientation: formOrientation,
      key: id,
      label: label,
      url: url,
      jobId: jobId,
      workflowStepId: workflowStepId,
      iframeUrl: iframeUrl
    });
  }));
  if (imageUrl) return /*#__PURE__*/_react["default"].createElement(ImageOnRight, {
    content: content,
    imageUrl: imageUrl,
    ctaContent: ctaContent
  });
  return /*#__PURE__*/_react["default"].createElement("div", null, ctaContent);
};
var ContentSections = exports.ContentSections = function ContentSections(_ref29) {
  var sections = _ref29.sections,
    colSpanContent = _ref29.colSpanContent,
    colSpanImage = _ref29.colSpanImage,
    localFont = _ref29.localFont,
    _ref29$setActiveHeade = _ref29.setActiveHeader,
    setActiveHeader = _ref29$setActiveHeade === void 0 ? function () {} : _ref29$setActiveHeade;
  return sections.map(function (_ref30) {
    var content = _ref30.content,
      contentType = _ref30.content_type,
      heading = _ref30.heading,
      headingLevel = _ref30.heading_level,
      id = _ref30.id,
      image = _ref30.image,
      showHeading = _ref30.show_heading,
      ctaData = _ref30.ctaData,
      scripts = _ref30.scripts;
    var imageUrl = image && "url" in image ? image["url"] : null;
    var imageHeight = image && "height" in image ? image["height"] : null;
    var imageWidth = image && "width" in image ? image["width"] : null;
    var headingOut = showHeading === false || contentType === CONTENT_TYPE_DIVIDER ? null : /*#__PURE__*/_react["default"].createElement(Heading, {
      title: heading,
      level: headingLevel,
      anchor: "heading-".concat(id),
      setActiveHeader: setActiveHeader,
      localFont: localFont
    });
    var sectionOut;
    switch (contentType) {
      case CONTENT_TYPE_TEXT_LEFT:
        sectionOut = /*#__PURE__*/_react["default"].createElement(TextLeft, {
          content: content
        });
        break;
      case CONTENT_TYPE_TEXT_RIGHT:
        sectionOut = /*#__PURE__*/_react["default"].createElement(TextRight, {
          content: content
        });
        break;
      case CONTENT_TYPE_TEXT_CENTER:
        sectionOut = /*#__PURE__*/_react["default"].createElement(TextCenter, {
          content: content
        });
        break;
      case CONTENT_TYPE_TEXT_IMAGE_LEFT:
        sectionOut = /*#__PURE__*/_react["default"].createElement(ImageOnLeft, {
          content: content,
          imageUrl: imageUrl,
          colSpanContent: colSpanContent,
          colSpanImage: colSpanImage
        });
        break;
      case CONTENT_TYPE_TEXT_IMAGE_RIGHT:
        sectionOut = /*#__PURE__*/_react["default"].createElement(ImageOnRight, {
          content: content,
          imageUrl: imageUrl,
          colSpanContent: colSpanContent,
          colSpanImage: colSpanImage
        });
        break;
      case CONTENT_TYPE_IMAGE_LEFT:
        sectionOut = /*#__PURE__*/_react["default"].createElement(ImageLeft, {
          imageUrl: imageUrl,
          height: imageHeight,
          width: imageWidth
        });
        break;
      case CONTENT_TYPE_IMAGE_RIGHT:
        sectionOut = /*#__PURE__*/_react["default"].createElement(ImageRight, {
          imageUrl: imageUrl,
          height: imageHeight,
          width: imageWidth
        });
        break;
      case CONTENT_TYPE_IMAGE_CENTER:
        sectionOut = /*#__PURE__*/_react["default"].createElement(ImageCenter, {
          imageUrl: imageUrl,
          height: imageHeight,
          width: imageWidth
        });
        break;
      case CONTENT_TYPE_IMAGE_FULL:
        sectionOut = /*#__PURE__*/_react["default"].createElement(ImageCenterFull, {
          imageUrl: imageUrl
        });
        break;
      case CONTENT_TYPE_DIVIDER:
        sectionOut = /*#__PURE__*/_react["default"].createElement("hr", {
          className: "my-4 mx-auto w-10/12 border-b-2 border-gray-300 md:my-10"
        });
        break;
      case CONTENT_TYPE_SIGN_UP:
        sectionOut = /*#__PURE__*/_react["default"].createElement(CTASection, {
          heading: heading,
          id: id,
          image: image,
          showHeading: showHeading,
          ctaData: ctaData,
          content: content
        });
        break;
      default:
        sectionOut = null;
        break;
    }
    return /*#__PURE__*/_react["default"].createElement(Section, {
      key: id,
      sectionOut: sectionOut,
      id: id,
      headingOut: headingOut,
      scripts: scripts
    });
  });
};
var DoContentSections = exports.DoContentSections = function DoContentSections(_ref31) {
  var sections = _ref31.sections,
    localFont = _ref31.localFont,
    _ref31$showInvisibleH = _ref31.showInvisibleHeaders,
    showInvisibleHeaders = _ref31$showInvisibleH === void 0 ? false : _ref31$showInvisibleH,
    _ref31$showMeter = _ref31.showMeter,
    showMeter = _ref31$showMeter === void 0 ? true : _ref31$showMeter;
  var _useState5 = (0, _react.useState)(null),
    _useState6 = (0, _slicedToArray2["default"])(_useState5, 2),
    activeHeader = _useState6[0],
    setActiveHeader = _useState6[1];
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "grid grid-cols-4 gap-0 lg:gap-6"
  }, /*#__PURE__*/_react["default"].createElement(TableOfContents, {
    sections: sections,
    activeHeader: activeHeader,
    localFont: localFont,
    showInvisibleHeaders: showInvisibleHeaders,
    showMeter: showMeter
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "col-span-4 lg:col-span-3"
  }, /*#__PURE__*/_react["default"].createElement(ContentSections, {
    sections: sections,
    setActiveHeader: setActiveHeader,
    localFont: localFont
  })));
};