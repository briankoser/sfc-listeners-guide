const timeLink = require('./timeLink.js');

module.exports = function (url, data, metadata) {
    return data.time == undefined ?  `Real-Life X-File: ${data.title}` : `${timeLink({"url":url, "t":data.time}, metadata)} Real-Life X-File: ${data.title}`;
}