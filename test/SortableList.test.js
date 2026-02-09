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

// Mock DnD modules BEFORE loading ContentSections
let capturedMonitorConfig = null;

// Clear any cached versions
const adapterPath = require.resolve("@atlaskit/pragmatic-drag-and-drop/element/adapter");
const hitboxPath = require.resolve("@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge");
delete require.cache[adapterPath];
delete require.cache[hitboxPath];

// Also clear ContentSections cache so it picks up our mocks
const csPath = require.resolve("../src/components/ContentSections.js");
delete require.cache[csPath];

require.cache[adapterPath] = {
  id: adapterPath,
  filename: adapterPath,
  loaded: true,
  exports: {
    monitorForElements: (config) => {
      capturedMonitorConfig = config;
      return () => {};
    },
    draggable: () => () => {},
    dropTargetForElements: () => () => {}
  }
};

let mockClosestEdge = "top";
require.cache[hitboxPath] = {
  id: hitboxPath,
  filename: hitboxPath,
  loaded: true,
  exports: {
    attachClosestEdge: (data) => data,
    extractClosestEdge: () => mockClosestEdge
  }
};

const assert = require("assert");
const React = require("react");
const ReactDOM = require("react-dom/client");
const { act } = require("react");
const { SortableList } = require("../src/components/ContentSections.js");

const makeRows = () => [
  { id: "a", name: "Row A" },
  { id: "b", name: "Row B" },
  { id: "c", name: "Row C" }
];

const makeDndEvent = (sourceId, targetId) => ({
  source: { data: { id: sourceId, collection: "test" } },
  location: {
    current: {
      dropTargets: [{ data: { id: targetId, collection: "test" } }]
    }
  }
});

describe("SortableList", () => {
  let container;
  let root;

  beforeEach(() => {
    capturedMonitorConfig = null;
    mockClosestEdge = "top";
    container = document.createElement("div");
    document.body.appendChild(container);
    root = ReactDOM.createRoot(container);
  });

  afterEach(() => {
    act(() => { root.unmount(); });
    document.body.removeChild(container);
  });

  const renderSortableList = (props) => {
    act(() => {
      root.render(React.createElement(SortableList, props));
    });
  };

  it("does not call dispatch or sortApi when source index is unresolved", async () => {
    let dispatched = false;
    let apiCalled = false;
    let sortingCleared = false;

    renderSortableList({
      rows: makeRows(),
      dispatch: () => { dispatched = true; },
      collection: "test",
      sortApi: () => { apiCalled = true; },
      setIsSorting: (val) => { if (val === null) sortingCleared = true; },
      sortableItems: []
    });

    assert.ok(capturedMonitorConfig, "monitorForElements should have been called");

    // Source ID "unknown" is not in rows
    await capturedMonitorConfig.onDrop(makeDndEvent("unknown", "b"));

    assert.strictEqual(dispatched, false, "dispatch should not be called with unresolved source");
    assert.strictEqual(apiCalled, false, "sortApi should not be called with unresolved source");
    assert.strictEqual(sortingCleared, true, "setIsSorting(null) should be called");
  });

  it("does not call dispatch or sortApi when target index is unresolved", async () => {
    let dispatched = false;
    let apiCalled = false;

    renderSortableList({
      rows: makeRows(),
      dispatch: () => { dispatched = true; },
      collection: "test",
      sortApi: () => { apiCalled = true; },
      setIsSorting: () => {},
      sortableItems: []
    });

    // Target ID "unknown" is not in rows
    await capturedMonitorConfig.onDrop(makeDndEvent("a", "unknown"));

    assert.strictEqual(dispatched, false, "dispatch should not be called with unresolved target");
    assert.strictEqual(apiCalled, false, "sortApi should not be called with unresolved target");
  });

  it("dispatches SORT_ROWS with correct payload shape on valid reorder", async () => {
    let dispatchedAction = null;
    let apiPayload = null;

    renderSortableList({
      rows: makeRows(),
      dispatch: (action) => { dispatchedAction = action; },
      collection: "test",
      sortApi: (payload) => { apiPayload = payload; },
      setIsSorting: () => {},
      sortableItems: []
    });

    // Move "a" (index 0) to where "c" (index 2) is, edge "top"
    mockClosestEdge = "top";
    await capturedMonitorConfig.onDrop(makeDndEvent("a", "c"));

    assert.ok(dispatchedAction, "dispatch should be called");
    assert.strictEqual(dispatchedAction.type, "SORT_ROWS");

    const data = dispatchedAction.data;
    assert.strictEqual(data.collection, "test");
    assert.strictEqual(typeof data.oldIndex, "number");
    assert.strictEqual(typeof data.newIndex, "number");
    assert.ok(Array.isArray(data.sortedRows), "sortedRows should be an array");
    assert.ok(Array.isArray(data.ids), "ids should be an array");
    assert.strictEqual(data.idField, "id");

    // sortApi should be called with { ids }
    assert.ok(apiPayload, "sortApi should be called");
    assert.ok(Array.isArray(apiPayload.ids), "sortApi should receive { ids }");
  });
});
