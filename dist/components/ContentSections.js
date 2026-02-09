"use strict";
"use client";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VideoItem = exports.SortableList = exports.DynamicForm = exports.DoContentSections = exports.ContentSections = exports.CONTENT_TYPE_TEXT_RIGHT = exports.CONTENT_TYPE_TEXT_LEFT = exports.CONTENT_TYPE_TEXT_IMAGE_RIGHT = exports.CONTENT_TYPE_TEXT_IMAGE_LEFT = exports.CONTENT_TYPE_TEXT_CENTER = exports.CONTENT_TYPE_TESTIMONIAL = exports.CONTENT_TYPE_MUX_VIDEO = exports.CONTENT_TYPE_IMAGE_RIGHT = exports.CONTENT_TYPE_IMAGE_LEFT = exports.CONTENT_TYPE_IMAGE_FULL = exports.CONTENT_TYPE_IMAGE_CENTER = exports.CONTENT_TYPE_FORM = exports.CONTENT_TYPE_DIVIDER = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _react = _interopRequireWildcard(require("react"));
var _copyToClipboard = _interopRequireDefault(require("copy-to-clipboard"));
var _reactHotToast = _interopRequireWildcard(require("react-hot-toast"));
var _reactScrollIntoView = _interopRequireDefault(require("react-scroll-into-view"));
var _adapter = require("@atlaskit/pragmatic-drag-and-drop/element/adapter");
var _closestEdge = require("@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge");
var _react2 = require("@headlessui/react");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
const CONTENT_TYPE_TEXT_LEFT = exports.CONTENT_TYPE_TEXT_LEFT = "text-only-left";
const CONTENT_TYPE_TEXT_RIGHT = exports.CONTENT_TYPE_TEXT_RIGHT = "text-only-right";
const CONTENT_TYPE_TEXT_CENTER = exports.CONTENT_TYPE_TEXT_CENTER = "text-only-center";
const CONTENT_TYPE_TEXT_IMAGE_LEFT = exports.CONTENT_TYPE_TEXT_IMAGE_LEFT = "text-with-left-image";
const CONTENT_TYPE_TEXT_IMAGE_RIGHT = exports.CONTENT_TYPE_TEXT_IMAGE_RIGHT = "text-with-right-image";
const CONTENT_TYPE_IMAGE_LEFT = exports.CONTENT_TYPE_IMAGE_LEFT = "image-only-left";
const CONTENT_TYPE_IMAGE_RIGHT = exports.CONTENT_TYPE_IMAGE_RIGHT = "image-only-right";
const CONTENT_TYPE_IMAGE_CENTER = exports.CONTENT_TYPE_IMAGE_CENTER = "image-only-center";
const CONTENT_TYPE_IMAGE_FULL = exports.CONTENT_TYPE_IMAGE_FULL = "image-only-full";
const CONTENT_TYPE_DIVIDER = exports.CONTENT_TYPE_DIVIDER = "divider";
const CONTENT_TYPE_MUX_VIDEO = exports.CONTENT_TYPE_MUX_VIDEO = "mux-video";
const CONTENT_TYPE_TESTIMONIAL = exports.CONTENT_TYPE_TESTIMONIAL = "testimonial";
const CONTENT_TYPE_FORM = exports.CONTENT_TYPE_FORM = "form";

/*
Theme colors:
  black
  white
  rose
  pink
  fuchsia
  purple
  violet
  indigo
  blue
  sky
  cyan
  teal
  emerald
  green
  lime
  yellow
  amber
  orange
  red
  stone
  neutral
  gray
  slate
*/

// color themes for buttons and backgrounds

const backgroundColorThemes = {
  ["none"]: "pt-0 mb-6",
  ["black"]: "bg-black border p-2 mb-6 rounded",
  ["white"]: "bg-white border border-gray-50 p-2 mb-6 rounded",
  ["rose"]: "bg-rose-50 p-2 mb-6 rounded",
  ["pink"]: "bg-pink-50 p-2 mb-6 rounded",
  ["fuchsia"]: "bg-fuchsia-50 p-2 mb-6 rounded",
  ["purple"]: "bg-purple-50 p-2 mb-6 rounded",
  ["violet"]: "bg-violet-50 p-2 mb-6 rounded",
  ["indigo"]: "bg-indigo-50 p-2 mb-6 rounded",
  ["blue"]: "bg-blue-50 p-2 mb-6 rounded",
  ["sky"]: "bg-sky-50 p-2 mb-6 rounded",
  ["cyan"]: "bg-cyan-50 p-2 mb-6 rounded",
  ["teal"]: "bg-teal-50 p-2 mb-6 rounded",
  ["emerald"]: "bg-emerald-50 p-2 mb-6 rounded",
  ["green"]: "bg-green-50 p-2 mb-6 rounded",
  ["lime"]: "bg-lime-50 p-2 mb-6 rounded",
  ["yellow"]: "bg-yellow-50 p-2 mb-6 rounded",
  ["amber"]: "bg-amber-50 p-2 mb-6 rounded",
  ["orange"]: "bg-orange-50 p-2 mb-6 rounded",
  ["red"]: "bg-red-50 p-2 mb-6 rounded",
  ["stone"]: "bg-stone-50 p-2 mb-6 rounded",
  ["neutral"]: "bg-neutral-50 p-2 mb-6 rounded",
  ["gray"]: "bg-gray-50 p-2 mb-6 rounded",
  ["slate"]: "bg-slate-50 p-2 mb-6 rounded"
};
const textColorThemes = {
  ["none"]: "",
  ["black"]: "text-black",
  ["white"]: "text-white",
  ["rose"]: "text-rose-900",
  ["pink"]: "text-pink-900",
  ["fuchsia"]: "text-fuchsia-900",
  ["purple"]: "text-purple-900",
  ["violet"]: "text-violet-900",
  ["indigo"]: "text-indigo-900",
  ["blue"]: "text-blue-900",
  ["sky"]: "text-sky-900",
  ["cyan"]: "text-cyan-900",
  ["teal"]: "text-teal-900",
  ["emerald"]: "text-emerald-900",
  ["green"]: "text-green-900",
  ["lime"]: "text-lime-900",
  ["yellow"]: "text-yellow-900",
  ["amber"]: "text-amber-900",
  ["orange"]: "text-orange-900",
  ["red"]: "text-red-900",
  ["stone"]: "text-stone-900",
  ["neutral"]: "text-neutral-900",
  ["gray"]: "text-gray-900",
  ["slate"]: "text-slate-900"
};
const buttonColorThemes = {
  ["black"]: "bg-black text-white hover:bg-gray-900",
  ["white"]: "bg-white text-black hover:bg-gray-100 focus-visible:outline-white border border-gray-300",
  ["rose"]: "bg-rose-600 text-white hover:bg-rose-500 focus-visible:outline-rose-600",
  ["pink"]: "bg-pink-600 text-white hover:bg-pink-500 focus-visible:outline-pink-600",
  ["fuchsia"]: "bg-fuchsia-600 text-white hover:bg-fuchsia-500 focus-visible:outline-fuchsia-600",
  ["purple"]: "bg-purple-600 text-white hover:bg-purple-500 focus-visible:outline-purple-600",
  ["violet"]: "bg-violet-600 text-white hover:bg-violet-500 focus-visible:outline-violet-600",
  ["indigo"]: "bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600",
  ["blue"]: "bg-blue-600 text-white hover:bg-blue-500 focus-visible:outline-blue-600",
  ["sky"]: "bg-sky-600 text-white hover:bg-sky-500 focus-visible:outline-sky-600",
  ["cyan"]: "bg-cyan-600 text-white hover:bg-cyan-500 focus-visible:outline-cyan-600",
  ["teal"]: "bg-teal-600 text-white hover:bg-teal-500 focus-visible:outline-teal-600",
  ["emerald"]: "bg-emerald-600 text-white hover:bg-emerald-500 focus-visible:outline-emerald-600",
  ["green"]: "bg-green-600 text-white hover:bg-green-500 focus-visible:outline-green-600",
  ["lime"]: "bg-lime-600 text-white hover:bg-lime-500 focus-visible:outline-lime-600",
  ["yellow"]: "bg-yellow-600 text-white hover:bg-yellow-500 focus-visible:outline-yellow-600",
  ["amber"]: "bg-amber-600 text-white hover:bg-amber-500 focus-visible:outline-amber-600",
  ["orange"]: "bg-orange-600 text-white hover:bg-orange-500 focus-visible:outline-orange-600",
  ["red"]: "bg-red-600 text-white hover:bg-red-500 focus-visible:outline-red-600",
  ["stone"]: "bg-stone-600 text-white hover:bg-stone-500 focus-visible:outline-stone-600",
  ["neutral"]: "bg-neutral-600 text-white hover:bg-neutral-500 focus-visible:outline-neutral-600",
  ["gray"]: "bg-gray-600 text-white hover:bg-gray-500 focus-visible:outline-gray-600",
  ["slate"]: "bg-slate-600 text-white hover:bg-slate-500 focus-visible:outline-slate-600"
};
const arrayMoveMutable = (array, fromIndex, toIndex) => {
  const startIndex = fromIndex < 0 ? array.length + fromIndex : fromIndex;
  if (startIndex >= 0 && startIndex < array.length) {
    const endIndex = toIndex < 0 ? array.length + toIndex : toIndex;
    const [item] = array.splice(fromIndex, 1);
    array.splice(endIndex, 0, item);
  }
};
const arrayMoveImmutable = (array, fromIndex, toIndex) => {
  if (!array) return;
  array = [...array];
  arrayMoveMutable(array, fromIndex, toIndex);
  return array;
};
const DynamicForm = _ref => {
  let {
    formData,
    localFont,
    backgroundColorTheme = null,
    showHeading,
    heading,
    id
  } = _ref;
  const [formValues, setFormValues] = (0, _react.useState)({});
  const [errors, setErrors] = (0, _react.useState)({});
  const [isSubmitting, setIsSubmitting] = (0, _react.useState)(false);
  const [submitStatus, setSubmitStatus] = (0, _react.useState)(null);

  // Initialize form values and sort fields by sort_key
  const sortedFields = formData !== null && formData !== void 0 && formData.fields ? [...formData.fields].sort((a, b) => a.sort_key - b.sort_key) : [];
  const validateField = (field, value) => {
    if (field.required && (!value || value.trim() === "")) {
      return "".concat(field.name, " is required");
    }
    if (field.display_type === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return "Please enter a valid email address";
      }
    }
    return null;
  };
  const handleInputChange = (field, value) => {
    setFormValues(prev => _objectSpread(_objectSpread({}, prev), {}, {
      [field.data_name]: value
    }));

    // Clear error when user starts typing
    if (errors[field.data_name]) {
      setErrors(prev => _objectSpread(_objectSpread({}, prev), {}, {
        [field.data_name]: null
      }));
    }
  };
  const handleBlur = field => {
    const value = formValues[field.data_name] || "";
    const error = validateField(field, value);
    if (error) {
      setErrors(prev => _objectSpread(_objectSpread({}, prev), {}, {
        [field.data_name]: error
      }));
    }
  };
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
    sortedFields.forEach(field => {
      const value = formValues[field.data_name] || "";
      const error = validateField(field, value);
      if (error) {
        newErrors[field.data_name] = error;
        isValid = false;
      }
    });
    return {
      isValid,
      newErrors
    };
  };
  const handleSubmit = async e => {
    e.preventDefault();
    const {
      isValid,
      newErrors
    } = validateForm();
    setErrors(newErrors);
    if (!isValid) {
      const firstErrorField = Object.keys(newErrors)[0];
      if (firstErrorField) {
        var _document$getElementB;
        (_document$getElementB = document.getElementById(firstErrorField)) === null || _document$getElementB === void 0 || _document$getElementB.focus();
      }
      return;
    }
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const response = await fetch("/api/community/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(_objectSpread({
          form_id: formData.id
        }, formValues))
      });
      if (response.ok) {
        setSubmitStatus("success");
        setFormValues({});
      } else {
        const errorData = await response.json();
        setSubmitStatus("error");
        console.error("Form submission error:", errorData);
      }
    } catch (error) {
      setSubmitStatus("error");
      console.error("Network error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const renderField = field => {
    const value = formValues[field.data_name] || "";
    const hasError = errors[field.data_name];
    const fieldId = field.data_name;
    const baseInputClasses = "\n      w-full px-3 py-2 border rounded-md shadow-sm transition-colors duration-200\n      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500\n      disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed\n      ".concat(hasError ? "border-red-300 focus:border-red-500 focus:ring-red-500" : "border-gray-300 hover:border-gray-400", "\n    ");

    // Common label rendering
    const renderLabel = () => /*#__PURE__*/_react.default.createElement("label", {
      htmlFor: fieldId,
      className: "block text-sm font-medium text-gray-700"
    }, field.name, field.required && /*#__PURE__*/_react.default.createElement("span", {
      className: "text-red-500 ml-1",
      "aria-label": "required"
    }, "*"));

    // Common description rendering
    const renderDescription = () => field.description && /*#__PURE__*/_react.default.createElement("p", {
      className: "text-sm text-gray-600",
      id: "".concat(fieldId, "-description")
    }, field.description);

    // Common error rendering
    const renderError = () => hasError && /*#__PURE__*/_react.default.createElement("p", {
      id: "".concat(fieldId, "-error"),
      className: "text-sm text-red-600 flex items-center",
      role: "alert",
      "aria-live": "polite"
    }, /*#__PURE__*/_react.default.createElement("svg", {
      className: "w-4 h-4 mr-1 flex-shrink-0",
      fill: "currentColor",
      viewBox: "0 0 20 20"
    }, /*#__PURE__*/_react.default.createElement("path", {
      fillRule: "evenodd",
      d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z",
      clipRule: "evenodd"
    })), hasError);

    // Handle textarea case - return early
    if (field.display_type === "textarea") {
      return /*#__PURE__*/_react.default.createElement("div", {
        key: field.id,
        className: "space-y-2"
      }, renderLabel(), renderDescription(), /*#__PURE__*/_react.default.createElement("textarea", {
        id: fieldId,
        name: field.data_name,
        value: value,
        onChange: e => handleInputChange(field, e.target.value),
        onBlur: () => handleBlur(field),
        required: field.required,
        disabled: isSubmitting,
        rows: 4,
        className: baseInputClasses,
        "aria-invalid": hasError ? "true" : "false",
        "aria-describedby": "".concat(hasError ? "".concat(fieldId, "-error") : "", " ").concat(field.description ? "".concat(fieldId, "-description") : "").trim(),
        placeholder: "Enter your message here..."
      }), renderError());
    }

    // Handle radio case - return early
    if (field.display_type === "radio" && field.options) {
      return /*#__PURE__*/_react.default.createElement("div", {
        key: field.id,
        className: "space-y-2"
      }, renderLabel(), renderDescription(), /*#__PURE__*/_react.default.createElement("div", {
        className: "space-y-2"
      }, field.options.map((option, index) => /*#__PURE__*/_react.default.createElement("label", {
        key: index,
        className: "flex items-center"
      }, /*#__PURE__*/_react.default.createElement("input", {
        type: "radio",
        name: field.data_name,
        value: option.value,
        checked: value === option.value,
        onChange: e => handleInputChange(field, e.target.value),
        onBlur: () => handleBlur(field),
        required: field.required,
        disabled: isSubmitting,
        className: "mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300",
        "aria-invalid": hasError ? "true" : "false"
      }), /*#__PURE__*/_react.default.createElement("span", {
        className: "text-sm text-gray-700"
      }, option.label)))), renderError());
    }

    // Default case for text/email inputs
    return /*#__PURE__*/_react.default.createElement("div", {
      key: field.id,
      className: "space-y-2"
    }, renderLabel(), renderDescription(), /*#__PURE__*/_react.default.createElement("input", {
      id: fieldId,
      name: field.data_name,
      type: field.display_type === "email" ? "email" : "text",
      value: value,
      onChange: e => handleInputChange(field, e.target.value),
      onBlur: () => handleBlur(field),
      required: field.required,
      disabled: isSubmitting,
      "aria-invalid": hasError ? "true" : "false",
      "aria-describedby": "".concat(hasError ? "".concat(fieldId, "-error") : "", " ").concat(field.description ? "".concat(fieldId, "-description") : "").trim(),
      className: baseInputClasses,
      placeholder: field.display_type === "email" ? "you@example.com" : ""
    }), renderError());
  };
  if (!formData || !formData.fields) {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
    }, /*#__PURE__*/_react.default.createElement("p", {
      className: "text-gray-500"
    }, "No form data available"));
  }
  let className = backgroundColorThemes[backgroundColorTheme];
  return /*#__PURE__*/_react.default.createElement("form", {
    onSubmit: handleSubmit,
    className: "max-w-2xl mx-auto p-6 ".concat(className ? className : "bg-white", " ").concat(localFont && localFont !== null && localFont !== void 0 && localFont.className ? localFont.className : "", " rounded-lg shadow-md")
  }, showHeading && /*#__PURE__*/_react.default.createElement("div", {
    className: "mb-6"
  }, /*#__PURE__*/_react.default.createElement("h2", {
    className: "text-2xl font-bold text-gray-900 mb-2"
  }, heading), formData.description && /*#__PURE__*/_react.default.createElement("p", {
    className: "text-gray-600"
  }, formData.description)), /*#__PURE__*/_react.default.createElement("div", {
    className: "space-y-6"
  }, sortedFields.map(renderField), submitStatus === "success" && /*#__PURE__*/_react.default.createElement("div", {
    className: "p-4 bg-green-50 border border-green-200 rounded-md"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "flex items-center"
  }, /*#__PURE__*/_react.default.createElement("svg", {
    className: "w-5 h-5 text-green-400 mr-2",
    fill: "currentColor",
    viewBox: "0 0 20 20"
  }, /*#__PURE__*/_react.default.createElement("path", {
    fillRule: "evenodd",
    d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
    clipRule: "evenodd"
  })), /*#__PURE__*/_react.default.createElement("p", {
    className: "text-green-800 font-medium"
  }, "Form submitted successfully!"))), submitStatus === "error" && /*#__PURE__*/_react.default.createElement("div", {
    className: "p-4 bg-red-50 border border-red-200 rounded-md"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "flex items-center"
  }, /*#__PURE__*/_react.default.createElement("svg", {
    className: "w-5 h-5 text-red-400 mr-2",
    fill: "currentColor",
    viewBox: "0 0 20 20"
  }, /*#__PURE__*/_react.default.createElement("path", {
    fillRule: "evenodd",
    d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z",
    clipRule: "evenodd"
  })), /*#__PURE__*/_react.default.createElement("p", {
    className: "text-red-800 font-medium"
  }, "There was an error submitting the form. Please try again."))), /*#__PURE__*/_react.default.createElement("div", {
    className: "pt-4"
  }, /*#__PURE__*/_react.default.createElement("button", {
    type: "submit",
    disabled: isSubmitting,
    className: "\n              w-full flex justify-center items-center px-4 py-2 border border-transparent \n              rounded-md shadow-sm text-sm font-medium text-white transition-colors duration-200\n              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500\n              ".concat(isSubmitting ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800", "\n            ")
  }, isSubmitting ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("svg", {
    className: "animate-spin -ml-1 mr-3 h-5 w-5 text-white",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react.default.createElement("circle", {
    className: "opacity-25",
    cx: "12",
    cy: "12",
    r: "10",
    stroke: "currentColor",
    strokeWidth: "4"
  }), /*#__PURE__*/_react.default.createElement("path", {
    className: "opacity-75",
    fill: "currentColor",
    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
  })), "Submitting...") : "Submit ".concat(formData.name)))));
};
exports.DynamicForm = DynamicForm;
const VideoItem = _ref2 => {
  let {
    muxPlaybackId,
    muxPosterOffset,
    borderClasses = "border-gray-100",
    content,
    textColorTheme = {},
    muxAccentColor = "indigo"
  } = _ref2;
  const colorThemes = {
    ["none"]: {
      border: "border-indigo-600",
      borderHover: "border-gray-900",
      backgroundHover: "bg-indigo-600",
      background: "bg-indigo-800",
      fill: "fill-indigo-50"
    },
    ["black"]: "bg-black border p-4 mb-6 rounded",
    ["white"]: {
      border: "border-indigo-600",
      borderHover: "border-gray-900",
      backgroundHover: "bg-indigo-600",
      background: "bg-indigo-800",
      fill: "fill-indigo-50"
    },
    ["rose"]: {
      border: "border-rose-600",
      borderHover: "border-gray-900",
      backgroundHover: "bg-rose-600",
      background: "bg-rose-800",
      fill: "fill-rose-50"
    },
    ["pink"]: {
      border: "border-pink-600",
      borderHover: "border-gray-900",
      backgroundHover: "bg-pink-600",
      background: "bg-pink-800",
      fill: "fill-pink-50"
    },
    ["fuchsia"]: {
      border: "border-fuchsia-600",
      borderHover: "border-gray-900",
      backgroundHover: "bg-fuchsia-600",
      background: "bg-fuchsia-800",
      fill: "fill-fuchsia-50"
    },
    ["purple"]: {
      border: "border-purple-600",
      borderHover: "border-gray-900",
      backgroundHover: "bg-purple-600",
      background: "bg-purple-800",
      fill: "fill-purple-50"
    },
    ["violet"]: {
      border: "border-violet-600",
      borderHover: "border-gray-900",
      backgroundHover: "bg-violet-600",
      background: "bg-violet-800",
      fill: "fill-violet-50"
    },
    ["indigo"]: {
      border: "border-indigo-600",
      borderHover: "border-gray-900",
      backgroundHover: "bg-indigo-600",
      background: "bg-indigo-800",
      fill: "fill-indigo-50"
    },
    ["indigo-inverted"]: {
      border: "border-indigo-200",
      borderHover: "border-indigo-300",
      backgroundHover: "bg-indigo-50",
      background: "bg-white",
      fill: "fill-indigo-700"
    },
    ["blue"]: {
      border: "border-blue-600",
      borderHover: "border-gray-900",
      backgroundHover: "bg-blue-600",
      background: "bg-blue-800",
      fill: "fill-blue-50"
    },
    ["sky"]: {
      border: "border-sky-600",
      borderHover: "border-gray-900",
      backgroundHover: "bg-sky-600",
      background: "bg-sky-800",
      fill: "fill-sky-50"
    },
    ["cyan"]: {
      border: "border-cyan-600",
      borderHover: "border-gray-900",
      backgroundHover: "bg-cyan-600",
      background: "bg-cyan-800",
      fill: "fill-cyan-50"
    },
    ["teal"]: {
      border: "border-teal-600",
      borderHover: "border-gray-900",
      backgroundHover: "bg-teal-600",
      background: "bg-teal-800",
      fill: "fill-teal-50"
    },
    ["emerald"]: {
      border: "border-emerald-600",
      borderHover: "border-gray-900",
      backgroundHover: "bg-emerald-600",
      background: "bg-emerald-800",
      fill: "fill-emerald-50"
    },
    ["green"]: {
      border: "border-green-600",
      borderHover: "border-gray-900",
      backgroundHover: "bg-green-600",
      background: "bg-green-800",
      fill: "fill-green-50"
    },
    ["lime"]: {
      border: "border-lime-600",
      borderHover: "border-gray-900",
      backgroundHover: "bg-lime-600",
      background: "bg-lime-800",
      fill: "fill-lime-50"
    },
    ["yellow"]: {
      border: "border-yellow-600",
      borderHover: "border-gray-900",
      backgroundHover: "bg-yellow-600",
      background: "bg-yellow-800",
      fill: "fill-yellow-50"
    },
    ["amber"]: {
      border: "border-amber-600",
      borderHover: "border-gray-900",
      backgroundHover: "bg-amber-600",
      background: "bg-amber-800",
      fill: "fill-amber-50"
    },
    ["orange"]: {
      border: "border-orange-600",
      borderHover: "border-gray-900",
      backgroundHover: "bg-orange-600",
      background: "bg-orange-800",
      fill: "fill-orange-50"
    },
    ["red"]: {
      border: "border-red-600",
      borderHover: "border-gray-900",
      backgroundHover: "bg-red-600",
      background: "bg-red-800",
      fill: "fill-red-50"
    },
    ["stone"]: {
      border: "border-stone-600",
      borderHover: "border-gray-900",
      backgroundHover: "bg-stone-600",
      background: "bg-stone-800",
      fill: "fill-stone-50"
    },
    ["neutral"]: {
      border: "border-neutral-600",
      borderHover: "border-gray-900",
      backgroundHover: "bg-neutral-600",
      background: "bg-neutral-800",
      fill: "fill-neutral-50"
    },
    ["gray"]: {
      border: "border-gray-600",
      borderHover: "border-gray-900",
      backgroundHover: "bg-gray-600",
      background: "bg-gray-800",
      fill: "fill-gray-50"
    },
    ["slate"]: {
      border: "border-slate-600",
      borderHover: "border-gray-900",
      backgroundHover: "bg-slate-600",
      background: "bg-slate-800",
      fill: "fill-slate-50"
    }
  };
  if (!(muxAccentColor in colorThemes)) muxAccentColor = "indigo";
  const [showVideo, setShowVideo] = (0, _react.useState)(false);
  if (content) borderClasses = "".concat(backgroundColorThemes["none"], " mb-4");
  const videoOut = showVideo ? /*#__PURE__*/_react.default.createElement("mux-video", {
    style: {
      width: "100%",
      aspectRatio: "16/9",
      objectFit: "contain"
    },
    className: "flex ".concat(borderClasses),
    "playback-id": muxPlaybackId,
    "metadata-video-title": "About FirstWho",
    "disable-tracking": true,
    "disable-cookies": true,
    controls: true,
    autoplay: true
  }) : /*#__PURE__*/_react.default.createElement("div", {
    onClick: () => {
      setShowVideo(true);
    },
    className: "group/item cursor-pointer aspect-video rounded-lg ".concat(borderClasses, " grid")
  }, /*#__PURE__*/_react.default.createElement("img", {
    className: "object-cover col-start-1 row-start-1",
    src: "https://image.mux.com/".concat(muxPlaybackId, "/thumbnail.jpg?width=1920&height=1080&time=").concat(muxPosterOffset || 1)
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(colorThemes[muxAccentColor]["border"], " opacity-80 border-2 group-hover/item:").concat(colorThemes[muxAccentColor]["borderHover"], " group-hover/item:").concat(colorThemes[muxAccentColor]["backgroundHover"], " col-start-1 row-start-1 grid h-12 w-16 md:h-24 md:w-32 place-self-center rounded-full ").concat(colorThemes[muxAccentColor]["background"])
  }, /*#__PURE__*/_react.default.createElement("svg", {
    className: "mt-2 md:mt-3 h-8 w-8 md:h-20 md:w-20 place-self-center",
    viewBox: "0 0 100 125"
  }, /*#__PURE__*/_react.default.createElement("path", {
    className: "".concat(colorThemes[muxAccentColor]["fill"]),
    d: "m77.6 54.3-46 26.6c-2 1.2-4.6-.3-4.6-2.7V25c0-2.4 2.6-3.8 4.6-2.7l46 26.6c2 1.3 2 4.2 0 5.4z"
  }))));
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, videoOut, content && /*#__PURE__*/_react.default.createElement(TextLeft, {
    content: content,
    textColorTheme: textColorTheme
  }));
};
exports.VideoItem = VideoItem;
const SortableList = _ref3 => {
  let {
    rows,
    dispatch,
    collection,
    sortApi,
    idField = "id",
    sortableItems = [],
    setIsSorting
  } = _ref3;
  (0, _react.useEffect)(() => {
    return (0, _adapter.monitorForElements)({
      canMonitor: _ref4 => {
        let {
          source
        } = _ref4;
        return source.data.collection === collection;
      },
      onDragStart: _ref5 => {
        let {
          source
        } = _ref5;
        setIsSorting(source.data.id);
      },
      onDrop: async _ref6 => {
        let {
          source,
          location
        } = _ref6;
        if (!location.current.dropTargets.length) {
          setIsSorting(null);
          return;
        }
        const sourceId = source.data.id;
        const targetData = location.current.dropTargets[0].data;
        const targetId = targetData.id;
        const closestEdge = (0, _closestEdge.extractClosestEdge)(targetData);
        const oldIndex = rows.findIndex(r => r[idField] === sourceId);
        const targetIndex = rows.findIndex(r => r[idField] === targetId);
        if (oldIndex === -1 || targetIndex === -1) {
          setIsSorting(null);
          return;
        }
        const edgeOffset = closestEdge === "bottom" ? 1 : 0;
        const resolvedNewIndex = targetIndex + edgeOffset - (oldIndex < targetIndex + edgeOffset ? 1 : 0);
        if (oldIndex === resolvedNewIndex) {
          setIsSorting(null);
          return;
        }
        try {
          const sortedRows = arrayMoveImmutable(rows, oldIndex, resolvedNewIndex);
          const ids = sortedRows.map(row => row[idField]);
          dispatch({
            type: "SORT_ROWS",
            data: {
              collection: collection || null,
              oldIndex,
              newIndex: resolvedNewIndex,
              sortedRows,
              ids,
              idField
            }
          });
          if (sortApi) await sortApi({
            ids
          });
        } finally {
          setIsSorting(null);
        }
      }
    });
  }, [rows, dispatch, collection, sortApi, idField, setIsSorting]);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, sortableItems);
};

// NOTE localFont is NextJS font object
exports.SortableList = SortableList;
const useScript = url => {
  (0, _react.useEffect)(() => {
    if (!url) return;
    const existing = document.querySelector("script[src=\"".concat(url, "\"]"));
    if (existing) return;
    const script = document.createElement("script");
    script.src = url;
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [url]);
};
const useOnScreen = (ref, setActiveHeader, anchor) => {
  (0, _react.useEffect)(() => {
    const observer = new IntersectionObserver(_ref7 => {
      let [entry] = _ref7;
      if (!(typeof entry === "object" && entry !== null)) return;
      if (entry.isIntersecting === true) setActiveHeader(anchor);
    }, {
      rootMargin: "0px 0px -300px 0px"
    });
    if (!(typeof ref.current === "object" && ref.current !== null)) return;
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, [ref, anchor, setActiveHeader]);
};
const DropIndicator = _ref8 => {
  let {
    edge
  } = _ref8;
  return /*#__PURE__*/_react.default.createElement("div", {
    style: _objectSpread({
      position: "absolute",
      left: 0,
      right: 0,
      height: "2px",
      background: "#2563eb"
    }, edge === "top" ? {
      top: 0
    } : {
      bottom: 0
    })
  });
};
const TocItem = _ref9 => {
  let {
    id,
    heading,
    showHeading,
    editCallback,
    deleteCallback,
    buttonClasses,
    offset,
    activeUntil,
    matched,
    visibleSections,
    localFont,
    showMeter,
    sortCollection,
    isSorting,
    tocItemClasses,
    tocItemMatchedClasses
  } = _ref9;
  const itemRef = (0, _react.useRef)(null);
  const handleRef = (0, _react.useRef)(null);
  const [isDragging, setIsDragging] = (0, _react.useState)(false);
  const [isDraggedOver, setIsDraggedOver] = (0, _react.useState)(false);
  const [closestEdge, setClosestEdge] = (0, _react.useState)(null);
  const [isDeleting, setIsDeleting] = (0, _react.useState)(false);
  const [isHovering, setIsHovering] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    if (!sortCollection) return;
    const el = itemRef.current;
    const handle = handleRef.current;
    const cleanupDraggable = (0, _adapter.draggable)({
      element: el,
      dragHandle: handle,
      getInitialData: () => ({
        id,
        collection: sortCollection
      }),
      onDragStart: () => setIsDragging(true),
      onDrop: () => setIsDragging(false)
    });
    const cleanupDropTarget = (0, _adapter.dropTargetForElements)({
      element: el,
      getData: _ref0 => {
        let {
          input,
          element
        } = _ref0;
        return (0, _closestEdge.attachClosestEdge)({
          id,
          collection: sortCollection
        }, {
          input,
          element,
          allowedEdges: ["top", "bottom"]
        });
      },
      canDrop: _ref1 => {
        let {
          source
        } = _ref1;
        return source.data.collection === sortCollection;
      },
      onDragEnter: _ref10 => {
        let {
          self
        } = _ref10;
        setIsDraggedOver(true);
        setClosestEdge((0, _closestEdge.extractClosestEdge)(self.data));
      },
      onDrag: _ref11 => {
        let {
          self
        } = _ref11;
        setClosestEdge((0, _closestEdge.extractClosestEdge)(self.data));
      },
      onDragLeave: () => {
        setIsDraggedOver(false);
        setClosestEdge(null);
      },
      onDrop: () => {
        setIsDraggedOver(false);
        setClosestEdge(null);
      }
    });
    return () => {
      cleanupDraggable();
      cleanupDropTarget();
    };
  }, [id, sortCollection]);
  const showStuff = editCallback && (isHovering && !isSorting || isSorting);
  const itemClasses = tocItemClasses ? "".concat(localFont.className, " grow space-x-2 cursor-pointer ").concat(tocItemClasses, " ").concat(matched && offset <= activeUntil ? tocItemMatchedClasses : "text-gray-500") : "".concat(editCallback ? "hover:underline" : "", " ").concat(matched && offset <= activeUntil ? "text-slate-800" : editCallback ? "text-slate-800" : "text-gray-500", " ").concat(localFont.className, " grow ").concat(showMeter ? "pl-4" : "", " pr-2 space-x-2 hover:text-gray-900 text-lg cursor-pointer ").concat(showHeading ? "" : "opacity-50");
  return /*#__PURE__*/_react.default.createElement("li", {
    onMouseEnter: () => setIsHovering(true),
    onMouseLeave: () => setIsHovering(false),
    ref: itemRef,
    style: {
      opacity: isDragging ? 0.5 : 1
    },
    className: "".concat(isSorting ? "bg-gray-50 z-index-50" : "", " flex items-center relative ").concat(editCallback ? "pt-2 first:pt-0 pl-4" : "")
  }, isDraggedOver && closestEdge && /*#__PURE__*/_react.default.createElement(DropIndicator, {
    edge: closestEdge
  }), showMeter && offset === 0 && /*#__PURE__*/_react.default.createElement("div", {
    className: "absolute h-1/2 w-4 top-0 -left-2 bg-white z-10"
  }), showMeter && offset === visibleSections.length - 1 && /*#__PURE__*/_react.default.createElement("div", {
    className: "absolute h-1/2 w-4 bottom-0 -left-2 bg-white z-10"
  }), showMeter && /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(matched && offset <= activeUntil ? "bg-slate-700" : "bg-white", " shrink-0 rounded-full w-3 h-3 border-slate-800 border-2 -ml-[7px] z-20")
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "flex grow"
  }, /*#__PURE__*/_react.default.createElement(_react2.Transition, {
    show: showStuff || false,
    className: "transition-all duration-500 overflow-hidden",
    enterFrom: "transform scale-95 opacity-0 max-h-0",
    enterTo: "transform scale-100 opacity-100 max-h-96",
    leaveFrom: "transform scale-100 opacity-100 max-h-96",
    leaveTo: "transform scale-95 opacity-0 max-h-0"
  }, /*#__PURE__*/_react.default.createElement("div", {
    ref: handleRef,
    className: "h-6 w-6 inline-block text-slate-500 -ml-1 mr-1 shrink",
    "aria-hidden": "true",
    style: {
      marginTop: "2px"
    }
  }, /*#__PURE__*/_react.default.createElement("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 15 15",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/_react.default.createElement("path", {
    d: "M7.1813 1.68179C7.35704 1.50605 7.64196 1.50605 7.8177 1.68179L10.3177 4.18179C10.4934 4.35753 10.4934 4.64245 10.3177 4.81819C10.142 4.99392 9.85704 4.99392 9.6813 4.81819L7.9495 3.08638L7.9495 11.9136L9.6813 10.1818C9.85704 10.0061 10.142 10.0061 10.3177 10.1818C10.4934 10.3575 10.4934 10.6424 10.3177 10.8182L7.8177 13.3182C7.73331 13.4026 7.61885 13.45 7.4995 13.45C7.38015 13.45 7.26569 13.4026 7.1813 13.3182L4.6813 10.8182C4.50557 10.6424 4.50557 10.3575 4.6813 10.1818C4.85704 10.0061 5.14196 10.0061 5.3177 10.1818L7.0495 11.9136L7.0495 3.08638L5.3177 4.81819C5.14196 4.99392 4.85704 4.99392 4.6813 4.81819C4.50557 4.64245 4.50557 4.35753 4.6813 4.18179L7.1813 1.68179Z",
    fill: "currentColor",
    fillRule: "evenodd",
    clipRule: "evenodd"
  })))), /*#__PURE__*/_react.default.createElement("div", {
    className: "grow flex flex-col"
  }, /*#__PURE__*/_react.default.createElement(_reactScrollIntoView.default, {
    selector: "#heading-".concat(id),
    className: "flex"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: itemClasses
  }, heading)), /*#__PURE__*/_react.default.createElement(_react2.Transition, {
    show: showStuff || false,
    className: "transition-all duration-500 overflow-hidden",
    enterFrom: "transform scale-95 opacity-0 max-h-0",
    enterTo: "transform scale-100 opacity-100 max-h-96",
    leaveFrom: "transform scale-100 opacity-100 max-h-96",
    leaveTo: "transform scale-95 opacity-0 max-h-0"
  }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(showMeter ? "pl-4" : "", " flex gap-x-2")
  }, /*#__PURE__*/_react.default.createElement("span", {
    onClick: () => editCallback(id),
    className: buttonClasses
  }, "Edit"), /*#__PURE__*/_react.default.createElement("span", {
    onClick: () => setIsDeleting(!isDeleting),
    className: buttonClasses
  }, "Delete")), isDeleting && /*#__PURE__*/_react.default.createElement("div", {
    className: "bg-white p-4 flex flex-col gap-y-4 rounded-md my-2"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "font-semibold"
  }, "Are you sure you want to delete this section?"), /*#__PURE__*/_react.default.createElement("div", {
    className: "flex gap-x-4"
  }, /*#__PURE__*/_react.default.createElement("span", {
    onClick: () => setIsDeleting(false),
    className: "cursor-pointer rounded-md bg-gray-200 px-2.5 py-1.5 text-base font-semibold text-gray-900 shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-200"
  }, "Cancel"), /*#__PURE__*/_react.default.createElement("span", {
    onClick: async () => {
      await deleteCallback({
        id
      });
    },
    className: "cursor-pointer rounded-md bg-red-600 px-2.5 py-1.5 text-base font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
  }, "Delete"))))))));
};
const TableOfContents = _ref12 => {
  let {
    sections,
    activeHeader,
    localFont,
    showInvisibleHeaders,
    showMeter,
    tocHeading = "Contents",
    sortApi = () => {},
    dispatch,
    sortCollection,
    tocGridClasses = "col-span-12 md:col-span-1",
    tocItemClasses,
    tocItemMatchedClasses,
    topStickyOffset = "top-[95px]"
  } = _ref12;
  const [isSorting, setIsSorting] = (0, _react.useState)(null);
  const visibleSections = showInvisibleHeaders ? sections : sections.filter(_ref13 => {
    let {
      show_heading: showHeading
    } = _ref13;
    return showHeading === true;
  });
  const [matched, activeUntil] = activeHeader === null ? [false, -1] : visibleSections.reduce((_ref14, _ref15, offset) => {
    let [isMatched, matchedOffset] = _ref14;
    let {
      id
    } = _ref15;
    if (isMatched) return [isMatched, matchedOffset];
    if ("heading-".concat(id) === activeHeader) return [true, offset];
    return [false, -1];
  }, [false, -1]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: tocGridClasses
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "sticky ".concat(sortCollection ? "top-0" : topStickyOffset, " hidden lg:block")
  }, tocHeading && /*#__PURE__*/_react.default.createElement("h3", {
    className: "".concat(localFont && (localFont === null || localFont === void 0 ? void 0 : localFont.className) || "", " -ml-1 mb-3 text-xl font-semibold text-slate-700")
  }, tocHeading), /*#__PURE__*/_react.default.createElement("ul", {
    className: "".concat(sortCollection ? "" : "mt-2", " ").concat(tocHeading ? "lg:mt-4" : "", " ").concat(sortCollection ? "lg:space-y-2 grid grid-cols-1 divide-y" : "lg:space-y-4", " ").concat(showMeter ? "border-l-2 border-slate-700" : "")
  }, /*#__PURE__*/_react.default.createElement(SortableList, {
    setIsSorting: setIsSorting,
    rows: visibleSections,
    sortableItems: visibleSections.map((_ref16, offset) => {
      let {
        id,
        heading,
        show_heading: showHeading,
        editCallback,
        deleteCallback,
        buttonClasses
      } = _ref16;
      return /*#__PURE__*/_react.default.createElement(TocItem, {
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
        showMeter: showMeter,
        sortCollection: sortCollection,
        isSorting: id === isSorting,
        tocItemClasses: tocItemClasses,
        tocItemMatchedClasses: tocItemMatchedClasses
      });
    }),
    collection: sortCollection,
    dispatch: dispatch,
    sortApi: sortApi
  }))));
};
const Heading = _ref17 => {
  let {
    title,
    level = 2,
    anchor,
    setActiveHeader,
    localFont,
    textColorTheme = "none",
    showCopyLink = true,
    headingClasses = "text-2xl font-semibold xl:mb-2 xl:text-3xl"
  } = _ref17;
  const ref = (0, _react.useRef)();
  useOnScreen(ref, setActiveHeader, anchor);
  if (level === 1) return /*#__PURE__*/_react.default.createElement("h1", {
    ref: ref,
    className: "".concat(localFont && (localFont === null || localFont === void 0 ? void 0 : localFont.className) || "", " ").concat(textColorThemes[textColorTheme], " mb-2 text-base font-semibold xl:mb-4 xl:text-4xl")
  }, title);
  if (level === 2) return /*#__PURE__*/_react.default.createElement("h2", {
    onClick: () => {
      if (!showCopyLink) return;
      (0, _copyToClipboard.default)(window.location.origin + window.location.pathname + "#".concat(anchor));
      _reactHotToast.default.success("Link copied to clipboard", {
        position: "bottom-center"
      });
    },
    ref: ref,
    className: "".concat(localFont && (localFont === null || localFont === void 0 ? void 0 : localFont.className) || "", " cursor-pointer ").concat(headingClasses, " flex items-center ").concat(textColorThemes[textColorTheme])
  }, /*#__PURE__*/_react.default.createElement("div", null, title), showCopyLink && /*#__PURE__*/_react.default.createElement("div", {
    className: "p-1 ml-2"
  }, /*#__PURE__*/_react.default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: "1.5",
    stroke: "currentColor",
    className: "w-4 h-4"
  }, /*#__PURE__*/_react.default.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
  }))));
  if (level === 3) return /*#__PURE__*/_react.default.createElement("h3", {
    ref: ref,
    className: "".concat(localFont && (localFont === null || localFont === void 0 ? void 0 : localFont.className) || "", " text-md font-semibold xl:mb-2 xl:text-2xl ").concat(textColorThemes[textColorTheme])
  }, title);
  if (level === 4) return /*#__PURE__*/_react.default.createElement("h4", {
    ref: ref,
    className: "".concat(localFont && (localFont === null || localFont === void 0 ? void 0 : localFont.className) || "", " text-base font-semibold xl:mb-2 xl:text-xl ").concat(textColorThemes[textColorTheme])
  }, title);
  if (level === 5) return /*#__PURE__*/_react.default.createElement("h5", {
    ref: ref,
    className: "".concat(localFont && (localFont === null || localFont === void 0 ? void 0 : localFont.className) || "", " text-base font-semibold xl:mb-2 ").concat(textColorThemes[textColorTheme])
  }, title);
  return null;
};
const TextLeft = _ref18 => {
  let {
    content,
    textColorTheme = "none",
    contentFont = {}
  } = _ref18;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat((contentFont === null || contentFont === void 0 ? void 0 : contentFont.className) || "", " leading-normal prose lg:prose-lg max-w-none ").concat(textColorThemes[textColorTheme]),
    dangerouslySetInnerHTML: {
      __html: content
    }
  });
};
const TextRight = _ref19 => {
  let {
    content,
    textColorTheme = "none",
    contentFont = {}
  } = _ref19;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat((contentFont === null || contentFont === void 0 ? void 0 : contentFont.className) || "", " text-right leading-normal prose lg:prose-lg max-w-none ").concat(textColorThemes[textColorTheme]),
    dangerouslySetInnerHTML: {
      __html: content
    }
  });
};
const TextCenter = _ref20 => {
  let {
    content,
    textColorTheme = "none",
    contentFont = {}
  } = _ref20;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat((contentFont === null || contentFont === void 0 ? void 0 : contentFont.className) || "", " text-center leading-normal prose lg:prose-lg max-w-none ").concat(textColorThemes[textColorTheme]),
    dangerouslySetInnerHTML: {
      __html: content
    }
  });
};
const ImageOnLeft = _ref21 => {
  let {
    content,
    imageUrl,
    colSpanContent = "col-span-12 md:col-span-6",
    colSpanImage = "col-span-12 md:col-span-6",
    contentFont = {}
  } = _ref21;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "grid grid-cols-12 gap-4"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: colSpanImage
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: imageUrl,
    alt: ""
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(colSpanContent, " ").concat((contentFont === null || contentFont === void 0 ? void 0 : contentFont.className) || "", " leading-normal prose lg:prose-lg max-w-none"),
    dangerouslySetInnerHTML: {
      __html: content
    }
  }));
};
const ImageOnRight = _ref22 => {
  let {
    content,
    imageUrl,
    colSpanContent = "w-full",
    colSpanImage = "w-full md:w-1/2",
    ctaContent = null,
    contentFont = {}
  } = _ref22;
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("img", {
    src: imageUrl,
    alt: "",
    className: "".concat(colSpanImage, " float-none md:float-right ml-0 md:ml-8 mb-4")
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(colSpanContent, " ").concat((contentFont === null || contentFont === void 0 ? void 0 : contentFont.className) || "", " leading-normal prose lg:prose-lg max-w-none"),
    dangerouslySetInnerHTML: {
      __html: content
    }
  }), ctaContent);
};
const ImageCenter = _ref23 => {
  let {
    imageUrl,
    height,
    width
  } = _ref23;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "flex justify-center"
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: imageUrl,
    height: height,
    width: width,
    alt: ""
  }));
};
const ImageCenterFull = _ref24 => {
  let {
    imageUrl
  } = _ref24;
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("img", {
    className: "object-fill",
    src: imageUrl,
    alt: ""
  }));
};
const ImageLeft = _ref25 => {
  let {
    imageUrl,
    height,
    width
  } = _ref25;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "flex justify-start"
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: imageUrl,
    height: height,
    width: width,
    alt: ""
  }));
};
const ImageRight = _ref26 => {
  let {
    imageUrl,
    height,
    width
  } = _ref26;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "flex justify-end"
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: imageUrl,
    height: height,
    width: width,
    alt: ""
  }));
};
const Section = _ref27 => {
  let {
    sectionOut,
    id,
    headingOut,
    scripts,
    backgroundColorTheme = "none",
    emptyContent = false
  } = _ref27;
  useScript((scripts === null || scripts === void 0 ? void 0 : scripts[0]) || false);
  let className = backgroundColorThemes[backgroundColorTheme];
  if (emptyContent) className = className.replace("mb-6", "mb-0");
  return /*#__PURE__*/_react.default.createElement("section", {
    key: id,
    className: className
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/_react.default.createElement("a", {
    className: "absolute -top-10",
    id: "heading-".concat(id),
    name: "heading-".concat(id)
  })), headingOut, sectionOut);
};
const BaseTestimonialSection = _ref28 => {
  let {
    heading,
    id,
    testimonials,
    showHeading
  } = _ref28;
  return /*#__PURE__*/_react.default.createElement("div", null, "Testimonials");
};
const ContentSections = _ref29 => {
  let {
    showCopyLink = false,
    sections,
    colSpanContent,
    colSpanImage,
    localFont,
    headingFont,
    contentFont,
    headingClasses,
    setActiveHeader = () => {},
    TestimonialComponent = BaseTestimonialSection
  } = _ref29;
  return sections.map(_ref30 => {
    let {
      content,
      content_type: contentType,
      heading,
      heading_level: headingLevel,
      id,
      image,
      show_heading: showHeading,
      scripts,
      backgroundColorTheme,
      textColorTheme,
      headingColorTheme,
      buttonColorTheme,
      muxPlaybackId,
      muxPosterOffset,
      muxAccentColor,
      borderClasses,
      testimonials,
      form
    } = _ref30;
    const imageUrl = image && "url" in image ? image["url"] : null;
    const imageHeight = image && "height" in image ? image["height"] : null;
    const imageWidth = image && "width" in image ? image["width"] : null;
    const emptyContent = [CONTENT_TYPE_TEXT_LEFT, CONTENT_TYPE_TEXT_RIGHT, CONTENT_TYPE_TEXT_CENTER].includes(contentType) && (content === null || content === "" || content === "<div></div>" || content === "<p></p>") || false;
    const headingOut = showHeading === false || contentType === CONTENT_TYPE_DIVIDER ? null : /*#__PURE__*/_react.default.createElement(Heading, {
      title: heading,
      level: headingLevel,
      anchor: "heading-".concat(id),
      setActiveHeader: setActiveHeader,
      localFont: headingFont || localFont,
      textColorTheme: headingColorTheme,
      showCopyLink: showCopyLink,
      headingClasses: headingClasses
    });
    let sectionOut;
    switch (contentType) {
      case CONTENT_TYPE_TEXT_LEFT:
        sectionOut = emptyContent ? null : /*#__PURE__*/_react.default.createElement(TextLeft, {
          content: content,
          textColorTheme: textColorTheme || "none",
          contentFont: contentFont || localFont
        });
        break;
      case CONTENT_TYPE_TEXT_RIGHT:
        sectionOut = emptyContent ? null : /*#__PURE__*/_react.default.createElement(TextRight, {
          content: content,
          textColorTheme: textColorTheme || "none",
          contentFont: contentFont || localFont
        });
        break;
      case CONTENT_TYPE_TEXT_CENTER:
        sectionOut = emptyContent ? null : /*#__PURE__*/_react.default.createElement(TextCenter, {
          content: content,
          textColorTheme: textColorTheme || "none",
          contentFont: contentFont || localFont
        });
        break;
      case CONTENT_TYPE_TEXT_IMAGE_LEFT:
        sectionOut = /*#__PURE__*/_react.default.createElement(ImageOnLeft, {
          content: content,
          imageUrl: imageUrl,
          colSpanContent: colSpanContent,
          colSpanImage: colSpanImage,
          contentFont: contentFont || localFont
        });
        break;
      case CONTENT_TYPE_TEXT_IMAGE_RIGHT:
        sectionOut = /*#__PURE__*/_react.default.createElement(ImageOnRight, {
          content: content,
          imageUrl: imageUrl,
          colSpanContent: colSpanContent,
          colSpanImage: colSpanImage,
          contentFont: contentFont || localFont
        });
        break;
      case CONTENT_TYPE_IMAGE_LEFT:
        sectionOut = /*#__PURE__*/_react.default.createElement(ImageLeft, {
          imageUrl: imageUrl,
          height: imageHeight,
          width: imageWidth
        });
        break;
      case CONTENT_TYPE_IMAGE_RIGHT:
        sectionOut = /*#__PURE__*/_react.default.createElement(ImageRight, {
          imageUrl: imageUrl,
          height: imageHeight,
          width: imageWidth
        });
        break;
      case CONTENT_TYPE_IMAGE_CENTER:
        sectionOut = /*#__PURE__*/_react.default.createElement(ImageCenter, {
          imageUrl: imageUrl,
          height: imageHeight,
          width: imageWidth
        });
        break;
      case CONTENT_TYPE_IMAGE_FULL:
        sectionOut = /*#__PURE__*/_react.default.createElement(ImageCenterFull, {
          imageUrl: imageUrl
        });
        break;
      case CONTENT_TYPE_DIVIDER:
        sectionOut = /*#__PURE__*/_react.default.createElement("hr", {
          className: "my-4 mx-auto w-10/12 border-b-2 border-gray-300 md:my-10"
        });
        break;
      case CONTENT_TYPE_MUX_VIDEO:
        sectionOut = /*#__PURE__*/_react.default.createElement(VideoItem, {
          muxPlaybackId: muxPlaybackId,
          muxAccentColor: muxAccentColor,
          muxPosterOffset: muxPosterOffset,
          content: content,
          textColorTheme: textColorTheme || "none",
          borderClasses: borderClasses || "border-gray-100"
        });
        break;
      case CONTENT_TYPE_TESTIMONIAL:
        sectionOut = /*#__PURE__*/_react.default.createElement(TestimonialComponent, {
          heading: heading,
          id: id,
          testimonials: testimonials,
          showHeading: showHeading
        });
        break;
      case CONTENT_TYPE_FORM:
        sectionOut = /*#__PURE__*/_react.default.createElement(DynamicForm, {
          formData: form,
          localFont: localFont,
          backgroundColorTheme: backgroundColorTheme,
          showHeading: showHeading,
          heading: heading,
          id: id
        });
        break;
      default:
        sectionOut = null;
        break;
    }
    return /*#__PURE__*/_react.default.createElement(Section, {
      key: id,
      sectionOut: sectionOut,
      id: id,
      headingOut: contentType != CONTENT_TYPE_FORM ? headingOut : null,
      scripts: scripts,
      backgroundColorTheme: backgroundColorTheme || "none",
      emptyContent: emptyContent
    });
  });
};
exports.ContentSections = ContentSections;
const DoContentSections = _ref31 => {
  let {
    sections,
    localFont,
    tocFont,
    headingFont,
    contentFont,
    showInvisibleHeaders = false,
    showMeter = true,
    showCopyLink = true,
    tocHeading = "Contents",
    sortApi = () => {},
    dispatch,
    sortCollection,
    outerGridClasses = "grid grid-cols-4 gap-0 md:gap-6",
    tocGridClasses = "col-span-4 md:col-span-1",
    mainGridClasses = "col-span-4 md:col-span-3",
    tocItemClasses,
    tocItemMatchedClasses,
    topStickyOffset = "top-[95px]",
    headingClasses = "text-2xl font-semibold xl:mb-2 xl:text-3xl",
    TestimonialComponent = BaseTestimonialSection
  } = _ref31;
  const [activeHeader, setActiveHeader] = (0, _react.useState)(null);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: outerGridClasses
  }, /*#__PURE__*/_react.default.createElement(TableOfContents, {
    sections: sections,
    activeHeader: activeHeader,
    localFont: tocFont || localFont,
    showInvisibleHeaders: showInvisibleHeaders,
    showMeter: showMeter,
    tocHeading: tocHeading,
    sortApi: sortApi,
    dispatch: dispatch,
    sortCollection: sortCollection,
    tocGridClasses: tocGridClasses,
    tocItemClasses: tocItemClasses,
    tocItemMatchedClasses: tocItemMatchedClasses,
    topStickyOffset: topStickyOffset
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: mainGridClasses
  }, /*#__PURE__*/_react.default.createElement(ContentSections, {
    showCopyLink: showCopyLink,
    sections: sections,
    setActiveHeader: setActiveHeader,
    localFont: localFont,
    headingFont: headingFont,
    contentFont: contentFont,
    headingClasses: headingClasses,
    TestimonialComponent: TestimonialComponent || BaseTestimonialSection
  })), /*#__PURE__*/_react.default.createElement(_reactHotToast.Toaster, null));
};
exports.DoContentSections = DoContentSections;