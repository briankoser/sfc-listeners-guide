const fs = require('fs');
const path = require('path');
const lunr = require('lunr');
const initialSearchIndexLocation = './_site/data/searchIndex.json';
const lunrSearchIndexLocation = './_site/data/lunrIndex.json';

let ensureDirectoryExistence = function (filePath) {
    var dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
        return true;
    }
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
}

let removeEmpty = (obj) => {
    Object.keys(obj).forEach((key) => (Object.keys(obj[key]).length === 0) && delete obj[key]);
}

fs.readFile(initialSearchIndexLocation, 'utf8', (err, data) => {
    if (err) {
        console.log('Error reading initial search index: ' + err);
        process.exit(1);
    }

    let episodes = JSON.parse(data);
    
    let lunrStore = {};
    let lunrIndex = lunr(function () {
        this.ref('url')
        this.field('tags', { boost: 5 });
        this.field('title', { boost: 15 });
        this.field('number', { boost: 15 });
        this.field('date', { boost: 5 });
        this.field('category', { boost: 5 });
        this.field('series', { boost: 10 });
        this.field('notable_moments');
        this.field('firsts');
        this.field('prophecy');
        this.field('future_episodes');
        this.field('celebrity_invites');
        this.field('celebrity_promo');
        this.field('recommendation_reason');
        this.field('archivist_note');
        this.field('post');
        
        episodes.forEach(function (episode) {
            this.add(episode);
            lunrStore[episode.url] = {
                'title': `№ ${episode.number} ${episode.title}`
            };
        }, this);
    });

    ensureDirectoryExistence(lunrSearchIndexLocation);

    fs.writeFile(lunrSearchIndexLocation, 
        JSON.stringify({
            index: lunrIndex,
            store: lunrStore
        }), 
        (err) => {
            if (err) {
                console.log('Error writing lunr search index: ' + err);
            } 
            else {
                console.log('Successfully wrote lunr search index.');
            }
        }
    );
});