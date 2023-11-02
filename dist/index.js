"use strict";

var _getContent = require("./get-content");
var getContent = _getContent.getContent;
var _componentsContentSections = require("./components/ContentSections");
var DoContentSections = _componentsContentSections.DoContentSections;
var ContentSections = _componentsContentSections.ContentSections;
var _componentsInternalLink = require("./components/InternalLink");
var InternalLink = _componentsInternalLink.InternalLink;
module.exports = {
  getContent: getContent,
  DoContentSections: DoContentSections,
  ContentSections: ContentSections,
  InternalLink: InternalLink
};