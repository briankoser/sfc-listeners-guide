module.exports = function (quote) {
    return (quote.guest == undefined) ?
        `<q class="${quote.b == undefined ? 'matt' : 'ben'}">${quote.b || quote.m}</q>` :
        `<q data-name="${quote.guest}">${quote.quote}</q>`;
}