module.exports = function ratingShortCode (title, benRating, mattRating) {
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

    let benStars = ratingToStars(benRating);
    let mattStars = ratingToStars(mattRating);
    
    return `
<div class="review clearfix is-size-4">
    <header>${title}</header>
    <div class="ratings">
        <div class="rating ben" title="Ben's rating out of 5 stars">${benStars}</div>
        <div class="rating matt" title="Matt's rating out of 5 stars">${mattStars}</div>
    </div>
</div>`;
}