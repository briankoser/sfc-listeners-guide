module.exports = function(eleventyConfig) {
  const { DateTime } = require("luxon");
  const fs = require("fs");
  const metadata = JSON.parse(fs.readFileSync("_data/metadata.json"));

  eleventyConfig.addLayoutAlias("baseHero", "layouts/baseHero.njk");
  eleventyConfig.addLayoutAlias("baseNavBar", "layouts/baseNavBar.njk");
  eleventyConfig.addLayoutAlias("page", "layouts/page.njk");
  eleventyConfig.addLayoutAlias("episode", "layouts/episode.njk");
  eleventyConfig.addLayoutAlias("season", "layouts/season.njk");

  eleventyConfig.addFilter("color", shortName => {
    return (metadata.hosts.find(host => host.shortName === shortName).color || {}).name;
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
    let episodesReverse = Object.assign([], episodes);
    episodesReverse.reverse();

    let episodeToLinkFormat = episode => {
      if (!episode) {
        return undefined;
      }

      let url = episode.url;
      let title = episode.data.title;
      let number = episode.data.number;
      let season = episode.data.season;

      return {url, title, number, season};
    };

    // add previous and next episode data
    for (let i = 0; i < episodes.length; i++) {
      // previous episode
      episodes[i].data.previous = episodeToLinkFormat(episodes[i - 1]);

      // next episode
      episodes[i].data.next = episodeToLinkFormat(episodes[i + 1]);

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

    // Last episode
    let lastEpisodeIndex = episodes.length - 1;
    episodes[0].data.last = episodeToLinkFormat(episodes[lastEpisodeIndex]);

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
          'hosts': episode.data.hosts,
          'guest_hosts': episode.data.guest_hosts
        };
    });
    let hostEpisodesReverse = Object.assign([], hostEpisodes);
    hostEpisodesReverse.reverse();

    let hostOccurences = hostEpisodes.map(x => x.hosts).reduce((a, b) => a.concat(b), []);
    let uniqueHosts = [...new Set(hostOccurences)];
    let hosts = uniqueHosts
      .map(host => { return { 
        'name': host, 
        'count': hostOccurences.filter(x => x === host).length,
        'first': hostEpisodes.find(x => x.hosts.includes(host)).number,
        'last': hostEpisodesReverse.find(x => x.hosts.includes(host)).number
      } })
      .sort( (a, b) => b.count > a.count );
    episodes[0].data.stats.hosts = hosts;
    
    // Guest host stats
    let guestHostOccurrences = hostEpisodes
      .filter(x => x.guest_hosts)
      .map(x => x.guest_hosts)
      .reduce((a, b) => a.concat(b), []);
    let uniqueGuestHosts = [...new Set(guestHostOccurrences)];
    let guestHosts = uniqueGuestHosts
      .map(guestHost => { return { 
        'name': guestHost, 
        'count': guestHostOccurrences.filter(x => x === guestHost).length,
        'first': (hostEpisodes.find(x => ((x.guest_hosts || []).includes(guestHost))) || {}).number,
        'last': (hostEpisodesReverse.find(x => (x.guest_hosts || []).includes(guestHost)) || {}).number
      } })
      .sort( (a, b) => b.count > a.count );
    episodes[0].data.stats.guest_hosts = guestHosts;

    // Episode stats
    let episodeStats = {};
    let timeLoopGaps = episodes
      .filter(episode => episode.data.time_loop_forward)
      .map(episode => { return {
        'title': episode.data.title,
        'number': episode.data.number,
        'gap': episode.data.time_loop_forward.number - episode.data.number
      } });
    episodeStats.quickestTimeLoop = timeLoopGaps.sort( (a, b) => a.gap > b.gap)[0];

    let oldestWithoutTimeLoop = episodes.find(episode => episode.data.time_loop_forward === undefined);
    episodeStats.oldestWithoutTimeLoop = {
      'title': oldestWithoutTimeLoop.data.title, 
      'number': oldestWithoutTimeLoop.data.number 
    };
    
    episodes[0].data.stats.episodes = episodeStats;

    // Series stats
    let episodeSeries = episodes
    .map(episode => {
      return {
        'number': episode.data.number,
        'series': episode.data.series
      }
    });
    let seriesOccurences = episodeSeries
      .map(episode => episode.series)
      .reduce((a, b) => a.concat(b), [])
      .filter(series => series != undefined);
    let uniqueSeries = [...new Set(seriesOccurences)];
    let seriesStats = uniqueSeries
      .map(series => { return {
        'name': series,
        'summary': (metadata.series.find(s => s.name === series) || {}).summary,
        'count': seriesOccurences.filter(s => s === series).length,
        'first': episodes.find(episode => episode.data.series === series),
        'last': episodesReverse.find(episode => episode.data.series === series)
    } })
    .sort( (a, b) => b.last.data.number > a.last.data.number );

    episodes[0].data.stats.series = seriesStats;

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
    let prophecies = episodes
      .map(episode => episode.data.prophecy)
      .filter(prophecy => prophecy != null)
      .reduce((a, b) => a.concat(b), []);
    let prophecyHosts = [...new Set(prophecies.map(prophecy => prophecy.host))];
    let prophecyStats = prophecyHosts
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

    // Tag Stats
    let episodeTags = episodes
      .map(episode => { 
        return {
          'number': episode.data.number,
          'tags': episode.data.tags
        }
      });
    let episodeTagsReverse = Object.assign([], episodeTags);
    episodeTagsReverse.reverse();
    let tagOccurences = episodeTags.map(episode => episode.tags).reduce((a, b) => a.concat(b), []);
    let uniqueTags = [...new Set(tagOccurences)]
      .filter(tag => tag !== 'episode');
    let tagStats = uniqueTags
      .map(tag => { return { 
        'name': (metadata.tags.find(t => t.slug === tag) || {}).name || tag,
        'count': tagOccurences.filter(x => x === tag).length,
        'first': (episodeTags.find(x => ((x.tags || []).includes(tag))) || {}).number,
        'last': (episodeTagsReverse.find(x => (x.tags || []).includes(tag)) || {}).number
      } })
      .sort( (a, b) => b.count > a.count );
    episodes[0].data.stats.tags = tagStats;

    return episodes;
  });

  eleventyConfig.addCollection("seasons", function(collection) {
    let seasons = collection.getFilteredByTag("season");
    let episodes = collection.getFilteredByTag("episode");

    // add previous and next season data
    for (let i = 0; i < seasons.length; i++) {
      // previous season
      let number = ((seasons[i - 1] || {}).data || {}).seasonNumber;
      seasons[i].data.previousSeason = number;

      // next season
      number = ((seasons[i + 1] || {}).data || {}).seasonNumber;
      seasons[i].data.nextSeason = number;
    }

    // Season Episode Stats
    let seasonEpisodes = episodes.map(episode => { 
        return {
          'url': episode.url,
          'title': episode.data.title,
          'number': episode.data.number,
          'season': episode.data.season,
          'timeloop': !!episode.data.time_loop_backward,
          'recommendation': episode.data.recommendation
        };
    });
    
    let seasonEpisodesReverse = Object.assign([], seasonEpisodes);
    seasonEpisodesReverse.reverse();

    let seasonStats = seasons
      .map(season => {
        let number = season.data.seasonNumber;
        let newSeason = season;
        newSeason.data.count = seasonEpisodes.filter(e => e.season === number).length;
        newSeason.data.first = seasonEpisodes.find(e => e.season === number);
        newSeason.data.last = seasonEpisodesReverse.find(e => e.season === number);
        newSeason.data.timeloops = seasonEpisodes.filter(e => e.season === number && e.timeloop).length;
        newSeason.data.counts = {};
        newSeason.data.counts.essential = seasonEpisodes.filter(e => e.season === number && e.recommendation.startsWith('essential')).length;
        newSeason.data.counts.yes = seasonEpisodes.filter(e => e.season === number && e.recommendation.startsWith('yes')).length;
        newSeason.data.counts.no = seasonEpisodes.filter(e => e.season === number && e.recommendation.startsWith('no')).length;
        return newSeason;  
      })
      .sort( (a, b) => a.data.number > b.data.number );

    return seasonStats;
  });

  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");

  return {
    templateFormats: [
      "html",
      "md",
      "njk",
      "ico",
      "png",
      "svg",
      "webmanifest",
      "xml"
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