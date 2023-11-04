"use strict";
"use client";

var _slicedToArray = require("@babel/runtime/helpers/slicedToArray");
var _react = require("react");
var React = _react;
var useEffect = _react.useEffect;
var useRef = _react.useRef;
var useState = _react.useState;
var _reactIconsFa = require("react-icons/fa");
var FaLink = _reactIconsFa.FaLink;
var copy = require("copy-to-clipboard");
var toast = require("react-hot-toast");
var ScrollTo = require("react-scroll-into-view");
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
  useEffect(function () {
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
  useEffect(function () {
    var observer = new IntersectionObserver(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 1),
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
var TableOfContents = function TableOfContents(_ref3) {
  var sections = _ref3.sections,
    activeHeader = _ref3.activeHeader,
    localFont = _ref3.localFont;
  var visibleSections = sections.filter(function (_ref4) {
    var showHeading = _ref4.show_heading;
    return showHeading === true;
  });
  var _ref5 = activeHeader === null ? [false, -1] : visibleSections.reduce(function (_ref7, _ref8, offset) {
      var _ref9 = _slicedToArray(_ref7, 2),
        isMatched = _ref9[0],
        matchedOffset = _ref9[1];
      var id = _ref8.id;
      if (isMatched) return [isMatched, matchedOffset];
      if ("heading-".concat(id) === activeHeader) return [true, offset];
      return [false, -1];
    }, [false, -1]),
    _ref6 = _slicedToArray(_ref5, 2),
    matched = _ref6[0],
    activeUntil = _ref6[1];
  return /*#__PURE__*/React.createElement("div", {
    className: "col-span-12 md:col-span-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sticky top-[95px] hidden lg:block"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "".concat(localFont.className, " -ml-1 mb-3 text-xl font-semibold text-slate-700")
  }, "Contents"), /*#__PURE__*/React.createElement("ul", {
    className: "mt-2 border-l-2 lg:mt-4 lg:space-y-4 border-slate-700"
  }, visibleSections.length > 0 && visibleSections.map(function (_ref10, offset) {
    var id = _ref10.id,
      heading = _ref10.heading;
    return /*#__PURE__*/React.createElement("li", {
      key: id,
      className: "flex items-center relative"
    }, offset === 0 && /*#__PURE__*/React.createElement("div", {
      className: "absolute h-1/2 w-4 top-0 -left-2 bg-white z-10"
    }), offset === visibleSections.length - 1 && /*#__PURE__*/React.createElement("div", {
      className: "absolute h-1/2 w-4 bottom-0 -left-2 bg-white z-10"
    }), /*#__PURE__*/React.createElement("div", {
      className: "".concat(matched && offset <= activeUntil ? "bg-slate-700" : "bg-white", " shrink-0 rounded-full w-3 h-3 border-slate-800 border-2 -ml-[7px] z-20")
    }), /*#__PURE__*/React.createElement(ScrollTo, {
      selector: "#heading-".concat(id)
    }, /*#__PURE__*/React.createElement("div", {
      href: "#heading-".concat(id),
      className: "".concat(matched && offset <= activeUntil ? "text-slate-800" : "text-gray-500", " ").concat(localFont.className, " grow px-2 pl-4 pr-2 space-x-2 hover:text-gray-900 text-lg cursor-pointer")
    }, heading)));
  }))));
};
var Heading = function Heading(_ref11) {
  var title = _ref11.title,
    _ref11$level = _ref11.level,
    level = _ref11$level === void 0 ? 2 : _ref11$level,
    anchor = _ref11.anchor,
    setActiveHeader = _ref11.setActiveHeader,
    localFont = _ref11.localFont;
  var ref = useRef();
  useOnScreen(ref, setActiveHeader, anchor);
  if (level === 1) return /*#__PURE__*/React.createElement("h1", {
    ref: ref,
    className: "".concat(localFont.className, " mb-2 text-base font-semibold xl:mb-4 xl:text-4xl")
  }, title);
  if (level === 2) return /*#__PURE__*/React.createElement("h2", {
    onClick: function onClick() {
      copy(window.location.origin + window.location.pathname + "#".concat(anchor));
      toast.success("Link copied to clipboard", {
        position: "bottom-center"
      });
    },
    ref: ref,
    className: "".concat(localFont.className, " cursor-pointer mt-4 text-2xl font-semibold xl:mb-2 xl:text-3xl flex items-center text-slate-700 hover:text-slate-900")
  }, /*#__PURE__*/React.createElement("div", null, title), /*#__PURE__*/React.createElement("div", {
    className: "rounded-full bg-gray-100 p-1 ml-2"
  }, /*#__PURE__*/React.createElement(FaLink, {
    className: "h-4 w-4 text-gray-500"
  })));
  if (level === 3) return /*#__PURE__*/React.createElement("h3", {
    ref: ref,
    className: "".concat(localFont.className, " mb-2 text-md font-semibold xl:mb-4 xl:text-2xl")
  }, title);
  if (level === 4) return /*#__PURE__*/React.createElement("h4", {
    ref: ref,
    className: "".concat(localFont.className, " mb-2 text-base font-semibold xl:mb-4 xl:text-xl")
  }, title);
  if (level === 5) return /*#__PURE__*/React.createElement("h5", {
    ref: ref,
    className: "".concat(localFont.className, " mb-2 text-base font-semibold xl:mb-4")
  }, title);
  return null;
};
var TextLeft = function TextLeft(_ref12) {
  var content = _ref12.content;
  return /*#__PURE__*/React.createElement("div", {
    className: "leading-loose prose lg:prose-lg max-w-max",
    dangerouslySetInnerHTML: {
      __html: content
    }
  });
};
var TextRight = function TextRight(_ref13) {
  var content = _ref13.content;
  return /*#__PURE__*/React.createElement("div", {
    className: "text-right leading-loose prose lg:prose-lg max-w-max",
    dangerouslySetInnerHTML: {
      __html: content
    }
  });
};
var TextCenter = function TextCenter(_ref14) {
  var content = _ref14.content;
  return /*#__PURE__*/React.createElement("div", {
    className: "text-center leading-loose prose lg:prose-lg max-w-max",
    dangerouslySetInnerHTML: {
      __html: content
    }
  });
};
var ImageOnLeft = function ImageOnLeft(_ref15) {
  var content = _ref15.content,
    imageUrl = _ref15.imageUrl,
    _ref15$colSpanContent = _ref15.colSpanContent,
    colSpanContent = _ref15$colSpanContent === void 0 ? "col-span-12 md:col-span-6" : _ref15$colSpanContent,
    _ref15$colSpanImage = _ref15.colSpanImage,
    colSpanImage = _ref15$colSpanImage === void 0 ? "col-span-12 md:col-span-6" : _ref15$colSpanImage;
  return /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-12 gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: colSpanImage
  }, /*#__PURE__*/React.createElement("img", {
    src: imageUrl,
    alt: ""
  })), /*#__PURE__*/React.createElement("div", {
    className: "".concat(colSpanContent, " leading-loose prose lg:prose-lg max-w-max"),
    dangerouslySetInnerHTML: {
      __html: content
    }
  }));
};
var ImageOnRight = function ImageOnRight(_ref16) {
  var content = _ref16.content,
    imageUrl = _ref16.imageUrl,
    _ref16$colSpanContent = _ref16.colSpanContent,
    colSpanContent = _ref16$colSpanContent === void 0 ? "w-full" : _ref16$colSpanContent,
    _ref16$colSpanImage = _ref16.colSpanImage,
    colSpanImage = _ref16$colSpanImage === void 0 ? "w-full md:w-1/2" : _ref16$colSpanImage,
    _ref16$ctaContent = _ref16.ctaContent,
    ctaContent = _ref16$ctaContent === void 0 ? null : _ref16$ctaContent;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
    src: imageUrl,
    alt: "",
    className: "".concat(colSpanImage, " float-none md:float-right ml-0 md:ml-8 mb-4")
  }), /*#__PURE__*/React.createElement("div", {
    className: "".concat(colSpanContent, " leading-loose prose lg:prose-lg max-w-max"),
    dangerouslySetInnerHTML: {
      __html: content
    }
  }), ctaContent);
};
var ImageCenter = function ImageCenter(_ref17) {
  var imageUrl = _ref17.imageUrl,
    height = _ref17.height,
    width = _ref17.width;
  return /*#__PURE__*/React.createElement("div", {
    className: "flex justify-center"
  }, /*#__PURE__*/React.createElement("img", {
    src: imageUrl,
    height: height,
    width: width,
    alt: ""
  }));
};
var ImageCenterFull = function ImageCenterFull(_ref18) {
  var imageUrl = _ref18.imageUrl;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
    className: "object-fill",
    src: imageUrl,
    alt: ""
  }));
};
var ImageLeft = function ImageLeft(_ref19) {
  var imageUrl = _ref19.imageUrl,
    height = _ref19.height,
    width = _ref19.width;
  return /*#__PURE__*/React.createElement("div", {
    className: "flex justify-start"
  }, /*#__PURE__*/React.createElement("img", {
    src: imageUrl,
    height: height,
    width: width,
    alt: ""
  }));
};
var ImageRight = function ImageRight(_ref20) {
  var imageUrl = _ref20.imageUrl,
    height = _ref20.height,
    width = _ref20.width;
  return /*#__PURE__*/React.createElement("div", {
    className: "flex justify-end"
  }, /*#__PURE__*/React.createElement("img", {
    src: imageUrl,
    height: height,
    width: width,
    alt: ""
  }));
};
var Section = function Section(_ref21) {
  var sectionOut = _ref21.sectionOut,
    id = _ref21.id,
    headingOut = _ref21.headingOut,
    scripts = _ref21.scripts;
  useScript(scripts[0]);
  return /*#__PURE__*/React.createElement("section", {
    key: id,
    className: "pt-0 pb-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement("a", {
    className: "absolute -top-10",
    id: "heading-".concat(id),
    name: "heading-".concat(id)
  })), headingOut, sectionOut);
};
var CTAButton = function CTAButton(_ref22) {
  var label = _ref22.label,
    url = _ref22.url;
  return /*#__PURE__*/React.createElement("a", {
    href: url,
    className: "rounded-md bg-indigo-600 px-3.5 py-2.5 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
  }, label);
};
var CTALink = function CTALink(_ref23) {
  var label = _ref23.label,
    url = _ref23.url;
  return /*#__PURE__*/React.createElement("a", {
    href: url,
    className: "text-sm font-semibold leading-6 text-gray-900"
  }, label);
};
var CTAForm = function CTAForm(_ref24) {
  var iframeUrl = _ref24.iframeUrl,
    type = _ref24.type,
    formOrientation = _ref24.formOrientation;
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
  return /*#__PURE__*/React.createElement("iframe", {
    src: iframeUrl,
    className: classes,
    sandbox: "allow-top-navigation allow-scripts allow-forms"
  });
};
var CTASection = function CTASection(_ref25) {
  var id = _ref25.id,
    image = _ref25.image,
    ctaData = _ref25.ctaData,
    content = _ref25.content;
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
  var ctaContent = /*#__PURE__*/React.createElement("div", {
    className: "mt-10 flex items-center gap-x-6 bg-amber-100 p-2 rounded-lg"
  }, ctas.map(function (_ref26) {
    var id = _ref26.id,
      type = _ref26.type,
      label = _ref26.label,
      url = _ref26.url;
    if (type === "button") return /*#__PURE__*/React.createElement(CTAButton, {
      key: id,
      label: label,
      url: url
    });
    if (type === "link") return /*#__PURE__*/React.createElement(CTALink, {
      key: id,
      label: label,
      url: url
    });
    return /*#__PURE__*/React.createElement(CTAForm, {
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
  if (imageUrl) return /*#__PURE__*/React.createElement("imgOnRight", {
    content: content,
    imageUrl: imageUrl,
    ctaContent: ctaContent
  });
  return /*#__PURE__*/React.createElement("div", null, ctaContent);
};
var ContentSections = exports.ContentSections = function ContentSections(_ref27) {
  var sections = _ref27.sections,
    colSpanContent = _ref27.colSpanContent,
    colSpanImage = _ref27.colSpanImage,
    localFont = _ref27.localFont,
    _ref27$setActiveHeade = _ref27.setActiveHeader,
    setActiveHeader = _ref27$setActiveHeade === void 0 ? function () {} : _ref27$setActiveHeade;
  return sections.map(function (_ref28) {
    var content = _ref28.content,
      contentType = _ref28.content_type,
      heading = _ref28.heading,
      headingLevel = _ref28.heading_level,
      id = _ref28.id,
      image = _ref28.image,
      showHeading = _ref28.show_heading,
      ctaData = _ref28.ctaData,
      scripts = _ref28.scripts;
    var imageUrl = image && "url" in image ? image["url"] : null;
    var imageHeight = image && "height" in image ? image["height"] : null;
    var imageWidth = image && "width" in image ? image["width"] : null;
    var headingOut = showHeading === false || contentType === CONTENT_TYPE_DIVIDER ? null : /*#__PURE__*/React.createElement(Heading, {
      title: heading,
      level: headingLevel,
      anchor: "heading-".concat(id),
      setActiveHeader: setActiveHeader,
      localFont: localFont
    });
    var sectionOut;
    switch (contentType) {
      case CONTENT_TYPE_TEXT_LEFT:
        sectionOut = /*#__PURE__*/React.createElement(TextLeft, {
          content: content
        });
        break;
      case CONTENT_TYPE_TEXT_RIGHT:
        sectionOut = /*#__PURE__*/React.createElement(TextRight, {
          content: content
        });
        break;
      case CONTENT_TYPE_TEXT_CENTER:
        sectionOut = /*#__PURE__*/React.createElement(TextCenter, {
          content: content
        });
        break;
      case CONTENT_TYPE_TEXT_IMAGE_LEFT:
        sectionOut = /*#__PURE__*/React.createElement(ImageOnLeft, {
          content: content,
          imageUrl: imageUrl,
          colSpanContent: colSpanContent,
          colSpanImage: colSpanImage
        });
        break;
      case CONTENT_TYPE_TEXT_IMAGE_RIGHT:
        sectionOut = /*#__PURE__*/React.createElement(ImageOnRight, {
          content: content,
          imageUrl: imageUrl,
          colSpanContent: colSpanContent,
          colSpanImage: colSpanImage
        });
        break;
      case CONTENT_TYPE_IMAGE_LEFT:
        sectionOut = /*#__PURE__*/React.createElement(ImageLeft, {
          imageUrl: imageUrl,
          height: imageHeight,
          width: imageWidth
        });
        break;
      case CONTENT_TYPE_IMAGE_RIGHT:
        sectionOut = /*#__PURE__*/React.createElement(ImageRight, {
          imageUrl: imageUrl,
          height: imageHeight,
          width: imageWidth
        });
        break;
      case CONTENT_TYPE_IMAGE_CENTER:
        sectionOut = /*#__PURE__*/React.createElement(ImageCenter, {
          imageUrl: imageUrl,
          height: imageHeight,
          width: imageWidth
        });
        break;
      case CONTENT_TYPE_IMAGE_FULL:
        sectionOut = /*#__PURE__*/React.createElement(ImageCenterFull, {
          imageUrl: imageUrl
        });
        break;
      case CONTENT_TYPE_DIVIDER:
        sectionOut = /*#__PURE__*/React.createElement("hr", {
          className: "my-4 mx-auto w-10/12 border-b-2 border-gray-300 md:my-10"
        });
        break;
      case CONTENT_TYPE_SIGN_UP:
        sectionOut = /*#__PURE__*/React.createElement(CTASection, {
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
    return /*#__PURE__*/React.createElement(Section, {
      key: id,
      sectionOut: sectionOut,
      id: id,
      headingOut: headingOut,
      scripts: scripts
    });
  });
};
var DoContentSections = exports.DoContentSections = function DoContentSections(_ref29) {
  var sections = _ref29.sections,
    localFont = _ref29.localFont;
  var _useState = useState(null),
    _useState2 = _slicedToArray(_useState, 2),
    activeHeader = _useState2[0],
    setActiveHeader = _useState2[1];
  return /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-4 gap-0 lg:gap-6"
  }, /*#__PURE__*/React.createElement(TableOfContents, {
    sections: sections,
    activeHeader: activeHeader,
    localFont: localFont
  }), /*#__PURE__*/React.createElement("div", {
    className: "col-span-4 lg:col-span-3"
  }, /*#__PURE__*/React.createElement(ContentSections, {
    sections: sections,
    setActiveHeader: setActiveHeader,
    localFont: localFont
  })));
};