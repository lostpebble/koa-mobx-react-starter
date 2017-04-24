// Compiled using marko@4.2.8 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/html").t(__filename),
    marko_helpers = require("marko/runtime/html/helpers"),
    marko_escapeXml = marko_helpers.x,
    marko_escapeXmlAttr = marko_helpers.xa,
    marko_str = marko_helpers.s,
    marko_escapeScript = marko_helpers.xs,
    marko_loadTag = marko_helpers.t,
    init_components_tag = marko_loadTag(require("marko/components/taglib/init-components-tag")),
    await_reorderer_tag = marko_loadTag(require("marko/taglibs/async/await-reorderer-tag"));

function render(input, out) {
  var data = input;

  out.w("<!DOCTYPE html><html lang=\"en\"><head><title>" +
    marko_escapeXml(data.title) +
    "</title><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0\"><meta name=\"description\" content=\"" +
    marko_escapeXmlAttr(data.description) +
    "\"><link rel=\"apple-touch-icon\" sizes=\"180x180\" href=\"/apple-touch-icon.png\"><link rel=\"icon\" type=\"image/png\" href=\"/favicon-32x32.png\" sizes=\"32x32\"><link rel=\"icon\" type=\"image/png\" href=\"/favicon-16x16.png\" sizes=\"16x16\"><link rel=\"manifest\" href=\"/manifest.json\"><meta name=\"application-name\" content=\"Vibescout\"><link rel=\"stylesheet\" type=\"text/css\" href=\"/dist/styles.css\"></head><body><div id=\"root\">" +
    marko_str(data.html) +
    "</div><script type=\"text/javascript\">window.__INITIAL_STATE__ = JSON.stringify(" +
    marko_escapeScript(data.initialState) +
    ");</script><script src=\"/dist/bundle.js\"></script>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out);

  out.w("</body></html>");
}

marko_template._ = render;

marko_template.meta = {
    tags: [
      "marko/components/taglib/init-components-tag",
      "marko/taglibs/async/await-reorderer-tag"
    ]
  };
