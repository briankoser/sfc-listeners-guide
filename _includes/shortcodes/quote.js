module.exports = function (quote) {
    let hostQuote = (host, quote, action) => {
        if (quote == undefined && action == undefined) {
            return '';
        }
        
        if (quote == undefined) {
            return `<span class="${host.toLowerCase()}" data-name="${host}">${action}</span>`;
        }
        else {
            return `<q class="${host.toLowerCase()}" data-action="${action || ''}">${quote}</q>`;
        }
    };

    let guestQuote = (guest, quote) => 
        quote == undefined ? '' : `<q data-name="${guest}">${quote}</q>`;

    return `
        ${hostQuote('Ben', quote.b, quote.benAction)}
        ${hostQuote('Matt', quote.m, quote.mattAction)}
        ${hostQuote('Daniel', quote.daniel, quote.danielAction)}
        ${hostQuote('Koby', quote.koby, quote.kobyAction)}
        ${guestQuote(quote.guest, quote.quote)}
    `;
}