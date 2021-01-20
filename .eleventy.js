module.exports = function(eleventyConfig) {
  /*
      libraries
  */
  const { DateTime } = require("luxon");
  const Nunjucks = require("nunjucks");


  /*
      functions
  */
  let displayLength = function (length) {
    let pieces = length.split(':');
    let hours = parseInt(pieces[0]);
    let minutes = pieces[1];
    
    let hoursMinutes = '';
    if (hours === 0) {
      hoursMinutes = parseInt(minutes);
    }
    else {
      hoursMinutes = `${hours}:${minutes}`;
    }
    
    let seconds = pieces[2];

    return `${hoursMinutes}:${seconds}`;
  };

  let episodesGroupBy = function (episodeArray, property) {
    return episodeArray.reduce(function (acc, episode) {
      let key = episode.data[property]
      if (!acc[key]) {
        acc[key] = []
      }
      acc[key].push(episode)
      return acc
    }, {})
  }



  /*
      metadata
  */
  const fs = require("fs");
  const metadata = JSON.parse(fs.readFileSync("_data/metadata.json"));



  /*
      events
  */
  const { buildLunrSearchIndex } = require('./_data/search.js');
  eleventyConfig.on('afterBuild', () => {
    buildLunrSearchIndex();
  });



  /*
      filters
  */
  eleventyConfig.addFilter('categoryFilter', (episodes, category) => category ? episodes.filter(e => e.data.category == category) : episodes);
  eleventyConfig.addFilter("categoryDescription", slug => (metadata.categories.find(s => s.slug === slug) || {}).description || '');
  eleventyConfig.addFilter("categoryName", slug => (metadata.categories.find(s => s.slug === slug) || {}).name || slug);
  eleventyConfig.addFilter("color", shortName => (metadata.hosts.find(host => host.shortName === shortName).color || {}).name);
  eleventyConfig.addFilter("displayLength", displayLength);
  eleventyConfig.addFilter("fullName", shortName => metadata.hosts.find(host => host.shortName === shortName).fullName);
  eleventyConfig.addFilter("lower", s => (s === null || s === undefined || s === false) ? '' : s.toString().toLowerCase());
  eleventyConfig.addFilter("monthDayDate", dateObj => DateTime.fromJSDate(dateObj).toFormat("MMMM d"));
  eleventyConfig.addFilter("readableDate", dateObj => DateTime.fromJSDate(dateObj).toISODate());
  eleventyConfig.addFilter('seriesFilter', (episodes, series) => series ? episodes.filter(e => e.data.series == series) : episodes);
  eleventyConfig.addFilter("seriesDescription", slug => (metadata.series.find(s => s.slug === slug) || {}).description || '');
  eleventyConfig.addFilter("seriesName", slug => (metadata.series.find(s => s.slug === slug) || {}).name || slug);
  eleventyConfig.addFilter("today", option => option === "year" ? new Date().getFullYear() : new Date());
  eleventyConfig.addFilter("weakness", shortName => metadata.hosts.find(host => host.shortName === shortName).weakness);



  /*
      layouts
  */
  eleventyConfig.addLayoutAlias("baseHero", "layouts/baseHero.njk");
  eleventyConfig.addLayoutAlias("baseNavBar", "layouts/baseNavBar.njk");
  eleventyConfig.addLayoutAlias("page", "layouts/page.njk");
  eleventyConfig.addLayoutAlias("episode", "layouts/episode.njk");
  eleventyConfig.addLayoutAlias("season", "layouts/season.njk");



  /*
      nunjucks tags (can't be shortcodes because they access collections)
  */
  const episodeLinkNunjucksTag = require('./_includes/nunjucksTags/episodeLink.js');
  eleventyConfig.addNunjucksTag("episodeLink", episodeLinkNunjucksTag);



  /*
      passthrough copy
  */
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");



  /*
      settings
  */
  eleventyConfig.setDataDeepMerge(true);



  /*
      shortcodes
  */
  const autoLoad = require('auto-load');
  const shortcodes = autoLoad('_includes/shortcodes');
  let addShortcode = (name) => eleventyConfig.addShortcode(name, (data) => shortcodes[name](data, metadata));
  let addPairedShortcode = (name) => eleventyConfig.addPairedShortcode(name, (data) => shortcodes[name](data, metadata));

  addPairedShortcode('arc');
  addShortcode('quote');
  eleventyConfig.addShortcode('quotes', (url, quote) => shortcodes['quotes'](url, quote, metadata));
  addShortcode('rating');
  addShortcode('ratings');
  addShortcode('timeLink');
  addShortcode('work');



  /*
      template languages
  */
  let nunjucksEnvironment = new Nunjucks.Environment(
    new Nunjucks.FileSystemLoader("_includes"), 
    { 
      lstripBlocks: true,
      trimBlocks: true
    }
  );
  eleventyConfig.setLibrary("njk", nunjucksEnvironment);


  

  /*
      collections
  */
  eleventyConfig.addCollection("categories", function(collection) {
    let episodes = collection.getFilteredByTag("episode");
    return episodesGroupBy(episodes, 'category');
  });

  eleventyConfig.addCollection("episodes", function(collection) {
    let episodes = collection.getFilteredByTag("episode");
    let episodesReverse = Object.assign([], episodes);
    episodesReverse.reverse();

    let buildLinkModel = episode => {
      if (!episode) {
        return undefined;
      }

      let url = episode.url;
      let title = episode.data.title;
      let number = episode.data.number;
      let season = episode.data.season;

      return {url, title, number, season};
    };

    // add episode data
    for (let i = 0; i < episodes.length; i++) {
      // previous episode
      episodes[i].data.previous = buildLinkModel(episodes[i - 1]);

      // next episode
      episodes[i].data.next = buildLinkModel(episodes[i + 1]);

      // time loop forward url
      let timeLoopForward = episodes[i].data.time_loop_forward;
      if (timeLoopForward) {
        let futureEpisode = episodes.filter(e => e.data.number === timeLoopForward.number && e.data.category !== 'Spinoff')[0];
        timeLoopForward.url = (futureEpisode || {}).url;
      }

      // time loop backward url
      let timeLoopBackward = episodes[i].data.time_loop_backward;
      if (timeLoopBackward) {
        for (let i = 0; i < timeLoopBackward.length; i++) {
          let pastEpisode = episodes.filter(e => e.data.number === timeLoopBackward[i].number && e.data.category !== 'Spinoff')[0];
          timeLoopBackward[i].url = (pastEpisode || {}).url;
        } 
      }

      // combine `hosts` and `guests` into `appearances`
      let hosts = episodes[i].data.hosts;
      let guests = episodes[i].data.guests || [];
      
      episodes[i].data.appearances = [...hosts, ...guests];

      let hasGuests = episodes[i].data.appearances.length > 3;
      episodes[i].data.hasGuests = hasGuests;
    }

    // eleventy won't let me add data to the overall collection, so I'm adding it to the first episode
    episodes[0].data.stats = {};

    // Last episode
    let lastEpisodeIndex = episodes.length - 1;
    episodes[0].data.last = buildLinkModel(episodes[lastEpisodeIndex]);

    // Counts stats
    let counts = {};
    counts.essential = episodes.filter(e => e.data.recommendation.startsWith('essential')).length;
    counts.yes = episodes.filter(e => e.data.recommendation.startsWith('yes')).length;
    counts.no = episodes.filter(e => e.data.recommendation.startsWith('no')).length;
    episodes[0].data.stats.counts = counts;

    // Host and Guest stats
    let hostEpisodes = episodes.map(episode => { 
      return {
        'url': episode.url,
        'number': episode.data.number,
        'hosts': episode.data.hosts,
        'guests': episode.data.guests
      };
    });

    let hostEpisodesReverse = Object.assign([], hostEpisodes);
    hostEpisodesReverse.reverse();

    let guestOccurrences = hostEpisodes
      .filter(x => x.guests)
      .map(x => x.guests)
      .reduce((a, b) => a.concat(b), []);
    let uniqueGuests = [...new Set(guestOccurrences)];
    let guests = uniqueGuests
      .map(guest => { return { 
        'name': (metadata.hosts.find(host => host.shortName === guest) || {'fullName': guest}).fullName, 
        'count': guestOccurrences.filter(x => x === guest).length,
        'first': (hostEpisodes.find(x => ((x.guests || []).includes(guest))) || {}).number,
        'last': (hostEpisodesReverse.find(x => (x.guests || []).includes(guest)) || {}).number
      } })
      .sort( (a, b) => {
        // sort by count of episodes appeared in (descending), last episode appeared in (descending), name 
        let diff = b.count - a.count;
        if (diff !== 0) {
          return diff;
        }

        diff = b.last - a.last;
        if (diff !== 0) {
          return diff;
        }

        return a.name - b.name;
      });
    episodes[0].data.stats.guests = guests;

    let hostOccurences = hostEpisodes.map(x => x.hosts).reduce((a, b) => a.concat(b), []);
    let uniqueHosts = [...new Set(hostOccurences)];
    let hosts = uniqueHosts
      .map(host => { return { 
        'name': host,
        'count': hostOccurences.filter(x => x === host).length + guestOccurrences.filter(x => x === host).length,
        'first': hostEpisodes.find(x => x.hosts.includes(host)).number,
        'last': hostEpisodesReverse.find(x => x.hosts.includes(host)).number
      } })
      .sort( (a, b) => b.count - a.count );
    episodes[0].data.stats.hosts = hosts;
    
    // Episode stats
    let episodeStats = {};
    let timeLoopGaps = episodes
      .filter(episode => episode.data.time_loop_forward)
      .map(episode => { return {
        'title': episode.data.title,
        'number': episode.data.number,
        'gap': episode.data.time_loop_forward.number - episode.data.number
      } });
    episodeStats.quickestTimeLoop = timeLoopGaps.sort( (a, b) => a.gap - b.gap)[0];

    let oldestWithoutTimeLoop = episodes.find(episode => episode.data.time_loop_forward === undefined);
    episodeStats.oldestWithoutTimeLoop = {
      'title': oldestWithoutTimeLoop.data.title, 
      'number': oldestWithoutTimeLoop.data.number 
    };

    let lengthToSeconds = length => { 
      let timePieces = length.split(':').map(x => Number(x)); 
      let seconds = timePieces[0] * 3600 + timePieces[1] * 60 + timePieces[2];
      return seconds;
    }

    let secondsToLength = seconds => {
      let date = new Date(null);
      date.setSeconds(seconds);

      // returns hh:mm:ss
      return date.toISOString().substr(11, 8);
    }

    let episodeLengths = episodes
      .map(episode => { return {
        'title': episode.data.title,
        'number': episode.data.number,
        'length': episode.data.length,
        'seconds': lengthToSeconds(episode.data.length)
      }})
      .sort( (a,b) => a.seconds - b.seconds);
    episodeStats.shortestEpisode = episodeLengths[0];
    episodeStats.longestEpisode = episodeLengths[episodeLengths.length - 1];
    
    let totalSeconds = episodeLengths.map(x => x.seconds).reduce( (sum, current) => sum + current);
    episodeStats.averageLength = secondsToLength(Math.round(totalSeconds / episodes.length));

    let titles = episodes.map(e => e.data.title);
    let shortestTitleLength = titles.sort( (a, b) => a.length - b.length)[0].length;
    let longestTitleLength = titles.sort( (a, b) => b.length - a.length)[0].length;
    episodeStats.shortestTitle = episodes
      .filter(e => e.data.title.length === shortestTitleLength)
      .map(e => `№ ${e.data.number} ${e.data.title}`);
    episodeStats.longestTitle = episodes
      .filter(e => e.data.title.length === longestTitleLength)
      .map(e => `№ ${e.data.number} ${e.data.title}`);

    let uniqueTitles = [...new Set(titles)].sort();
    let duplicateTitles = uniqueTitles
      .map(title => { return { 
        'title': title,
        'count': titles.filter(x => x === title).length,
        'first': episodes.find(x => x.data.title === title).data.number,
        'last': episodesReverse.find(x => x.data.title === title).data.number
      } })
      .filter(x => x.count > 1)
      .sort( (a, b) => b.count - a.count );
    episodeStats.duplicateTitles = duplicateTitles;
    
    episodes[0].data.stats.episodes = episodeStats;

    // Categories stats
    let episodeCategories = episodes
    .map(episode => {
      return {
        'number': episode.data.number,
        'category': episode.data.category
      }
    });
    let categoryOccurences = episodeCategories
      .map(episode => episode.category)
      .reduce((a, b) => a.concat(b), []);
    let uniqueCategories = [...new Set(categoryOccurences)];
    let categoryStats = uniqueCategories
      .map(category => { return {
        'slug': category,
        'name': (metadata.categories.find(c => c.slug === category) || {}).name,
        'description': (metadata.categories.find(c => c.slug === category) || {}).description,
        'count': categoryOccurences.filter(c => c === category).length,
        'first': buildLinkModel(episodes.find(episode => episode.data.category === category)),
        'last': buildLinkModel(episodesReverse.find(episode => episode.data.category === category))
      } })
      .sort( (a, b) => {
        // sort by count of episodes (descending), last episode (descending) 
        let diff = b.count - a.count;
        if (diff !== 0) {
          return diff;
        }

        return b.last - a.last;
      });

    episodes[0].data.stats.categories = categoryStats;

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
        'slug': series,
        'name': (metadata.series.find(s => s.slug === series) || {}).name,
        'description': (metadata.series.find(s => s.slug === series) || {}).description,
        'count': seriesOccurences.filter(s => s === series).length,
        'first': buildLinkModel(episodes.find(episode => episode.data.series === series)),
        'last': buildLinkModel(episodesReverse.find(episode => episode.data.series === series))
    } })
    .sort( (a, b) => b.last.number - a.last.number );

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
        let resolved = prophecies.filter(p => p.host === host && p.veracity != 'undefined'); // undefined value is converted to `undefined` string by 11ty
        let totalResolved = resolved.length;
        let correct = resolved.filter(p => p.veracity).length;

        return {
          'name': host,
          'total': total,
          'correct': correct,
          'percentage': total === 0 ? 0 : correct / total,
          'unresolved': total - totalResolved
      }})
      .sort( (a, b) => b.percentage - a.percentage );
    episodes[0].data.stats.prophecy = prophecyStats;

    // Tag Stats
    let episodeTags = episodes
      .map(episode => { 
        return {
          'number': episode.data.number,
          'season': episode.data.season,
          'tags': episode.data.tags
        }
      });
    let episodeTagsReverse = Object.assign([], episodeTags);
    episodeTagsReverse.reverse();
    let tagOccurences = episodeTags.map(episode => episode.tags).reduce((a, b) => a.concat(b), []);
    let uniqueTags = [...new Set(tagOccurences)]
      .filter(tag => tag !== 'episode');
    let maxSeason = Math.max(...episodeTags.map(episode => episode.season));
    let tagSeasons = [...Array(maxSeason).keys()].map(x => x + 1);

    let tagStats = uniqueTags
      .map(tag => { 
        let seasonsMap = new Map(
          tagSeasons.map(season => 
            [season, episodeTags.filter(e => e.season === season && (e.tags || []).includes(tag)).length])
        );
        let seasons = [...seasonsMap].map(x => x[1]);

        return { 
          'name': (metadata.tags.find(t => t.slug === tag) || {}).name || tag,
          'count': tagOccurences.filter(x => x === tag).length,
          'first': (episodeTags.find(x => ((x.tags || []).includes(tag))) || {}).number,
          'last': (episodeTagsReverse.find(x => (x.tags || []).includes(tag)) || {}).number,
          'seasons': seasons
        } 
      })
      .sort( (a, b) => b.count - a.count );
    episodes[0].data.stats.tags = tagStats;

    // Time loops and Visits
    let timeloopsCount = episodes.filter(e => e.data.hasOwnProperty('time_loop_backward')).length;
    episodes[0].data.stats.episodes.timeloops = timeloopsCount;

    let visitCount = episodes.filter(e => e.data.hasOwnProperty('visit')).length;
    episodes[0].data.stats.episodes.visits = visitCount;

    // Spinoffs
    let spinoffCount = episodes.filter(e => e.data.category === 'spinoff').length;
    episodes[0].data.stats.episodes.spinoffs = spinoffCount;

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
          'timeloop': (episode.data.time_loop_backward || {}).length > 0,
          'visit': !!episode.data.visit,
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
        newSeason.data.visits = seasonEpisodes.filter(e => e.season === number && e.visit).length;
        newSeason.data.counts = {};
        newSeason.data.counts.essential = seasonEpisodes.filter(e => e.season === number && e.recommendation.startsWith('essential')).length;
        newSeason.data.counts.yes = seasonEpisodes.filter(e => e.season === number && e.recommendation.startsWith('yes')).length;
        newSeason.data.counts.no = seasonEpisodes.filter(e => e.season === number && e.recommendation.startsWith('no')).length;
        return newSeason;  
      })
      .sort( (a, b) => a.data.number - b.data.number );

    // eleventy won't let me add data to the overall collection, so I'm adding it to the first episode
    seasonStats[0].data.stats = {};

    // Season Recommendation Stats
    let recommendationsStats = seasonStats.map(season => 
      [season.data.counts.essential, season.data.counts.yes, season.data.counts.no]);
    seasonStats[0].data.stats.recommendations = recommendationsStats;

    // Season Timeloops and Visits Stats
    let timeloopVisitsChartData = seasonStats.map(season => { 
      let normalCount = season.data.count - season.data.timeloops - season.data.visits;
      return [season.data.timeloops, season.data.visits, normalCount]
    });

    seasonStats[0].data.stats.timeloopVisitsChart = timeloopVisitsChartData;

    return seasonStats;
  });

  eleventyConfig.addCollection("series", function(collection) {
    let episodes = collection.getFilteredByTag("episode");
    return episodesGroupBy(episodes, 'series');
  });

  eleventyConfig.addCollection("visits", function(collection) {
    let episodes = collection.getFilteredByTag("episode");

    return episodes
      .filter(e => e.data.hasOwnProperty('visit'))
      .map(e => {return {
        'url': e.url,
        'displayTitle': `№ ${e.data.number} ${e.data.title}`,
        'visit': e.data.visit
      }});
  })



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

    markdownTemplateEngine: "njk",
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