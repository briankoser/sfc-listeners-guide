const fs = require( 'fs' );
const lunr = require('lunr');
const initialSearchIndexLocation = './_site/searchIndex.json';
// const initialSearchIndexLocation = './_site/testIndex.json';
const lunrSearchIndexLocation = './_site/lunrIndex.json';

fs.readFile(initialSearchIndexLocation, 'utf8', (err, data) => {
    if (err) {
        console.log('Error reading initial search index: ' + err);
        process.exit(1);
    }

    let episodes = JSON.parse(data);

    var lunrIndex = lunr(function () {
        this.ref('url')
        this.field('tags');        
        this.field('title', { boost: 10 })
        this.field('number', { boost: 10 });
        this.field('date');
        this.field('category');
        this.field('series');
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
            this.add(episode)
        }, this);
    });

    fs.writeFile(lunrSearchIndexLocation, JSON.stringify(lunrIndex), (err) => {
        if (err) {
            console.log('Error writing lunr search index: ' + err);
        } 
        else {
            console.log('Successfully wrote lunr search index.');
        }
    });
});