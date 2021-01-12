module.exports = function (data, metadata) {
    let linkUrl = `${data.env === 'prod' ? metadata.analytics_url : ''}${data.url}`;

    let timePieces = data.t.split(':');

    while(timePieces.length < 3) {
        timePieces.unshift('00'); 
    }

    let paddedTime = timePieces.map(x => x.padStart(2, '0')).join(':');

    return `<a class="timestamp tag is-medium is-rounded is-primary" href="${linkUrl}#t=${paddedTime}">${data.t}</a>`;
}