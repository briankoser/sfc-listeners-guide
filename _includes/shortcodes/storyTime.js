const timeLink = require('./timeLink.js');

module.exports = function (url, data, metadata) {
    return `${timeLink({"url":url, "t":data.time}, metadata)} Sci-Fi Christian Story Time: ${data.title}`;
}