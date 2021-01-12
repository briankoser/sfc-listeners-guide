// [{'host': '', 'ratings': ['title': '', 'score': 0]}]
module.exports = function (hostRatings) {
    let ratingToStars = (rating) => {
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
    
    return `
<div class="ratings">
${hostRatings.map(hostRating => `
  <h2>${hostRating.host}</h2>
  <table class="table is-striped rating">
  <thead>
  <tr>
  <th>Title</th>
  <th>☆☆☆☆☆</th>
  </tr>
  </thead>
  <tbody>
  ${hostRating.ratings.map(rating => `
  <tr>
  <td>${rating.title}</td>
  <td title="${rating.score}">${ratingToStars(rating.score)}</td>
  </tr>
  `).join('')}
  </tbody>
  </table>
`).join('')}
</div>`;
}