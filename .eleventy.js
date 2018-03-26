module.exports = function(eleventyConfig) {
  const { DateTime } = require("luxon");
  const fs = require("fs");
  const metadata = JSON.parse(fs.readFileSync("_data/metadata.json"));

  eleventyConfig.addLayoutAlias("baseHero", "layouts/baseHero.njk");
  eleventyConfig.addLayoutAlias("baseNavBar", "layouts/baseNavBar.njk");
  eleventyConfig.addLayoutAlias("page", "layouts/page.njk");
  eleventyConfig.addLayoutAlias("episode", "layouts/episode.njk");

  eleventyConfig.addFilter("color", shortName => {
    return metadata.hosts.find(host => host.shortName === shortName).color.name;
  });

  eleventyConfig.addFilter("fullName", shortName => {
    return metadata.hosts.find(host => host.shortName === shortName).fullName;
  });

  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj).toISODate();
  });

  eleventyConfig.addFilter("today", option => {
    return option === 'year' ? new Date().getFullYear() : new Date();
  });

  eleventyConfig.addFilter("weakness", shortName => {
    return metadata.hosts.find(host => host.shortName === shortName).weakness;
  });



  eleventyConfig.addCollection("episodes", function(collection) {
    let episodes = collection.getFilteredByTag("episode");

    // add previous and next episode data
    for (let i = 0; i < episodes.length; i++) {
      // previous episode
      let url =     (episodes[i - 1] || {}).url;
      let title =  ((episodes[i - 1] || {}).data || {}).title;
      let number = ((episodes[i - 1] || {}).data || {}).number;

      episodes[i].data.previous = {url, title, number};

      // next episode
      url =     (episodes[i + 1] || {}).url;
      title =  ((episodes[i + 1] || {}).data || {}).title;
      number = ((episodes[i + 1] || {}).data || {}).number;

      episodes[i].data.next = {url, title, number};

      // time loop forward url
      let timeLoopForward = episodes[i].data.time_loop_forward;
      if (timeLoopForward) {
        let futureEpisode = episodes.filter(e => e.data.number === timeLoopForward.number)[0];
        timeLoopForward.url = (futureEpisode || {}).url;
      }

      // time loop backward url
      let timeLoopBackward = episodes[i].data.time_loop_backward;
      if (timeLoopBackward) {
        let pastEpisode = episodes.filter(e => e.data.number === timeLoopBackward.number)[0];
        timeLoopBackward.url = (pastEpisode || {}).url;
      }
    }

    // eleventy won't let me add data to the overall collection, so I'm adding it to the first episode
    episodes[0].data.stats = {};

    // Counts stats
    let counts = {};
    counts.essential = episodes.filter(e => e.data.recommendation.startsWith('essential')).length;
    counts.yes = episodes.filter(e => e.data.recommendation.startsWith('yes')).length;
    counts.no = episodes.filter(e => e.data.recommendation.startsWith('no')).length;
    episodes[0].data.stats.counts = counts;

    // Host stats
    let hostEpisodes = episodes.map(episode => { 
        return {
          'url': episode.url,
          'number': episode.data.number,
          'hosts': episode.data.hosts
        };
    });
    let hostEpisodesReverse = Object.assign([], hostEpisodes);
    hostEpisodesReverse.reverse();
    let hostStats = hostEpisodes.map(x => x.hosts).reduce((a, b) => a.concat(b), [])
    let uniqueHosts = [...new Set(hostStats)];
    let hosts = uniqueHosts
      .map(host => { return { 
        'name': host, 
        'count': hostStats.filter(x => x === host).length,
        'first': hostEpisodes.find(x => x.hosts.includes(host)).number,
        'last': hostEpisodesReverse.find(x => x.hosts.includes(host)).number
      } })
      .sort( (a, b) => b.count > a.count );
    episodes[0].data.stats.hosts = hosts;

    // Episode stats
    let episodeStats = {};
    let timeLoopGaps = episodes.map(episode => { return {
      'title': episode.data.title,
      'number': episode.data.number,
      'gap': episode.data.time_loop_forward.number - episode.data.number
    } });
    episodeStats.quickestTimeLoop = timeLoopGaps.sort( (a, b) => a.gap > b.gap)[0];
    episodes[0].data.stats.episodes = episodeStats;

    // Release Day stats
    let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    let releaseDays = episodes.map(episode => (new Date(episode.date)).getDay());
    let releaseDayStats = [];
    for (let i = 0; i <= 6; i++) {
      let day = {};
      day.name = days[i];
      day.count = releaseDays.filter(day => day === i).length;
      releaseDayStats[i] = day;
    }
    episodes[0].data.stats.releaseDay = releaseDayStats;

    // Prophecy Stats
    let prophecyStats = [];
    let prophecies = episodes
      .map(episode => episode.data.prophecy)
      .filter(prophecy => prophecy != null)
      .reduce((a, b) => a.concat(b), []);
    let prophecyHosts = [...new Set(prophecies.map(prophecy => prophecy.host))];
    prophecyStats = prophecyHosts
      .map(host => { 
        let total = prophecies.filter(p => p.host === host).length;
        let correct = prophecies.filter(p => p.host === host && p.veracity).length;

        return {
        'name': host,
        'total': total,
        'correct': correct,
        'percentage': correct / total
      }})
      .sort( (a, b) => b.percentage > a.percentage );
    episodes[0].data.stats.prophecy = prophecyStats;

    return episodes;
  });

  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");

  return {
    templateFormats: [
      "md",
      "njk",
      "html"
    ],

    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    passthroughFileCopy: true,
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};