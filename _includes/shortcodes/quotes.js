const quoteShortcode = require('./quote.js');
const timeLink = require('./timeLink.js');

module.exports = function (url, quote, metadata) {
    return `
<div class="quote">
${timeLink({"url":url, "t":quote.time}, metadata)}
${quote.context == undefined ? '' : `<span class="quote-context is-size-6">${quote.context}</span>`}
${quote.lines == undefined ? '' : quote.lines.map(q => quoteShortcode(q)).join('\n')}
</div>`;
}