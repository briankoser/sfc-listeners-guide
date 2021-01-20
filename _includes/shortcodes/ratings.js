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

    const ratingToStars = (rating) => {
        if (typeof(rating) === 'string') {
            return rating;
        }
        
        if (rating === 0) {
            return '0';
        }

        let ratingFloor = Math.floor(rating);

        let stars = '';
        for (let i = 0; i < ratingFloor; i++) {
            stars += '🟊';
        }
        return `${stars}${rating === ratingFloor ? '' : '½'}`;
    };

    const ratingRows = ratings => {
        return ratings.map(rating => `
<tr>
    <td>${rating.title}</td>
    <td title="${rating.score}">${ratingToStars(rating.score)}</td>
</tr>`).join('');
    };

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