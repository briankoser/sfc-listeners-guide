module.exports = function (rating) {
    if (typeof(rating) === 'string') {
        return rating;
    }
    
    if (rating === 0) {
        return '0';
    }

    let ratingFloor = Math.floor(rating);
    let stars = ''.padStart(ratingFloor * 2, '🟊'); // "* 2" because 🟊 is two bytes
    return `${stars}${rating === ratingFloor ? '' : '½'}`;
}