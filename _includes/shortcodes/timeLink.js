module.exports = function (data, metadata) {
    let linkUrl = `${process.env.NODE_ENV === 'prod' ? metadata.analytics_url : ''}${data.url}`;

    let timePieces = data.t.split(':');

    while(timePieces.length < 3) {
        timePieces.unshift('00'); 
    }

    let paddedTime = timePieces.map(x => x.padStart(2, '0')).join(':');

    return `<a class="timestamp tag" href="${linkUrl}#t=${paddedTime}">${data.t}</a>`;
}