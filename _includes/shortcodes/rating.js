const starsShortcode = require('./stars.js');

module.exports = function (rating) {
    const formatRating = (host, score) => 
        score == undefined ? '' : `<tr><td>${host}</td><td title="${host}'s rating out of 5 stars">${ starsShortcode(score) }</td></tr>`;

    return `
<table class="table is-striped rating">
    <thead><tr><th>Host</th><th>☆☆☆☆☆</th></tr></thead>
    <tbody>
        ${formatRating('Ben', rating.ben)}
        ${formatRating('Matt', rating.matt)}
        ${formatRating('Daniel', rating.daniel)}
        ${formatRating('Koby', rating.koby)}
    </tbody>
</table>`;
}