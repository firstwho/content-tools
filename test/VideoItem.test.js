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
const { VideoItem } = require("../src/components/ContentSections.js");

describe("VideoItem", () => {
  let container;
  let root;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = ReactDOM.createRoot(container);
  });

  afterEach(() => {
    act(() => { root.unmount(); });
    document.body.removeChild(container);
  });

  it("does not produce [object Object] in className when content is present", () => {
    act(() => {
      root.render(
        React.createElement(VideoItem, {
          muxPlaybackId: "test-id",
          muxPosterOffset: 1,
          content: "<p>Some content</p>",
          textColorTheme: "none",
          muxAccentColor: "indigo"
        })
      );
    });

    const html = container.innerHTML;
    assert.strictEqual(
      html.includes("[object Object]"),
      false,
      "className should not contain [object Object]"
    );
  });

  it("produces valid CSS classes when content is present", () => {
    act(() => {
      root.render(
        React.createElement(VideoItem, {
          muxPlaybackId: "test-id",
          muxPosterOffset: 1,
          content: "<p>Some content</p>",
          textColorTheme: "none",
          muxAccentColor: "indigo"
        })
      );
    });

    // The video shell element should have classes from backgroundColorThemes["none"] which is "pt-0 mb-6"
    const html = container.innerHTML;
    assert.ok(html.includes("pt-0"), "should include pt-0 from backgroundColorThemes[\"none\"]");
    assert.ok(html.includes("mb-4"), "should include mb-4 override");
  });

  it("uses default borderClasses when content is not present", () => {
    act(() => {
      root.render(
        React.createElement(VideoItem, {
          muxPlaybackId: "test-id",
          muxPosterOffset: 1,
          borderClasses: "border-gray-100",
          muxAccentColor: "indigo"
        })
      );
    });

    const html = container.innerHTML;
    assert.ok(html.includes("border-gray-100"), "should use provided borderClasses");
    assert.strictEqual(
      html.includes("[object Object]"),
      false,
      "should never contain [object Object]"
    );
  });
});
