module.exports = function timeLinkShortCode (url, time) {
    let timePieces = time.split(':'); 
    
    while(timePieces.length < 3) { 
        timePieces.unshift('00'); 
    }

    let paddedTime = timePieces.map(x => x.padStart(2, '0')).join(':');
    
    return `<a class="timestamp tag is-medium is-rounded is-primary" href="${url}#t=${paddedTime}">${time}</a>`;
}