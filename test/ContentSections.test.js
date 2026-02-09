// Setup jsdom BEFORE React is loaded — React detects DOM at require time.
// We use require() instead of import to control evaluation order,
// since Babel hoists import-derived require() calls above inline code.
const { JSDOM } = require("jsdom");
const dom = new JSDOM("<!DOCTYPE html><html><body></body></html>");
global.window = dom.window;
global.document = dom.window.document;
Object.defineProperty(global, "navigator", {
  value: dom.window.navigator,
  writable: true,
  configurable: true
});
global.HTMLElement = dom.window.HTMLElement;
global.IS_REACT_ACT_ENVIRONMENT = true;

const assert = require("assert");
const React = require("react");
const ReactDOM = require("react-dom/client");
const { act } = require("react");
const { DynamicForm } = require("../src/components/ContentSections.js");

const makeFormData = (fields) => ({
  id: "test-form",
  name: "Test",
  description: "Test form",
  fields
});

const requiredField = (name, sortKey = 0) => ({
  id: `field-${name}`,
  name,
  data_name: name,
  display_type: "text",
  required: true,
  sort_key: sortKey
});

describe("DynamicForm", () => {
  let container;
  let root;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = ReactDOM.createRoot(container);
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    document.body.removeChild(container);
  });

  it("renders a <form> element with onSubmit", () => {
    const formData = makeFormData([requiredField("email", 1)]);
    act(() => {
      root.render(
        React.createElement(DynamicForm, {
          formData,
          localFont: { className: "" },
          showHeading: false,
          heading: "Test",
          id: "test"
        })
      );
    });

    const form = container.querySelector("form");
    assert.ok(form, "should render a <form> element");
  });

  it("submit button has type=submit", () => {
    const formData = makeFormData([requiredField("email", 1)]);
    act(() => {
      root.render(
        React.createElement(DynamicForm, {
          formData,
          localFont: { className: "" },
          showHeading: false,
          heading: "Test",
          id: "test"
        })
      );
    });

    const button = container.querySelector("button");
    assert.strictEqual(button.type, "submit", "button should have type=submit");
  });

  it("field sorting does not mutate formData.fields", () => {
    const fields = [
      requiredField("b", 2),
      requiredField("a", 1)
    ];
    const originalOrder = fields.map((f) => f.data_name);
    const formData = makeFormData(fields);

    act(() => {
      root.render(
        React.createElement(DynamicForm, {
          formData,
          localFont: { className: "" },
          showHeading: false,
          heading: "Test",
          id: "test"
        })
      );
    });

    const currentOrder = fields.map((f) => f.data_name);
    assert.deepStrictEqual(
      currentOrder,
      originalOrder,
      "formData.fields should not be mutated by sorting"
    );
  });

  it("invalid submit focuses first invalid field based on current validation", () => {
    const fields = [
      requiredField("first_name", 2),
      requiredField("email", 1)
    ];
    const formData = makeFormData(fields);

    act(() => {
      root.render(
        React.createElement(DynamicForm, {
          formData,
          localFont: { className: "" },
          showHeading: false,
          heading: "Test",
          id: "test"
        })
      );
    });

    // Both fields are required and empty. After sorting by sort_key,
    // "email" (sort_key=1) comes before "first_name" (sort_key=2).
    // So the first error field should be "email".
    const form = container.querySelector("form");

    act(() => {
      form.dispatchEvent(new dom.window.Event("submit", { bubbles: true, cancelable: true }));
    });

    // The focused element should be the "email" input (sort_key=1 is sorted first)
    const activeEl = document.activeElement;
    assert.strictEqual(
      activeEl.id,
      "email",
      "should focus the first invalid field by sort order (email, sort_key=1)"
    );
  });
});
