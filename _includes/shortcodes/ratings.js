const starsShortcode = require('./stars.js');

module.exports = function (ratings) {
    const hostList = (host, ratings) => {
        if (!ratings)
            return '';

        return `
<div class="column ${host.toLowerCase()}">
    <h3>${host}</h3>
    <table class="table is-striped rating">
        <thead>
            <tr>
                <th>Title</th>
                <th>☆☆☆☆☆</th>
            </tr>
        </thead>
        <tbody>
            ${ratingRows(ratings)}
        </tbody>
    </table>
</div>`;
    };

    const ratingRows = ratings => 
        ratings.map(rating => `<tr><td>${rating.title}</td><td title="${rating.score}">${starsShortcode(rating.score)}</td></tr>`).join('');

    const ratingTitle = ratings => ratings.title ? `<h2 class="has-text-centered">${ratings.title}</h2>` : '';

    return `
<div class="ratings">
${ratingTitle(ratings)}
<div class="columns">
    ${hostList('Ben', ratings.ben)}
    ${hostList('Matt', ratings.matt)}
</div>
</div>`;
}