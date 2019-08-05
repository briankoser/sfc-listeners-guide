const fetch = require('node-fetch');
const { JSDOM } = require("jsdom");

async function fetchTotalEpisodes() {
    return fetch('http://thescifichristian.com/')
      .then(res => res.text())
      .then(body => new JSDOM(body))
      .then(dom => dom.window.document
        .querySelector('.main-featured-post a:first-child').textContent // eg "Episode 1: Pilot"
        .split(':')[0] // eg "Episode 1"
        .split(' ')[1]); // eg "1"
}

module.exports = async function() {
    let totalEpisodes = await fetchTotalEpisodes();
    console.log(`Total episodes: ${totalEpisodes}`);
    return {totalEpisodes};
};