const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  eleventyConfig.addLayoutAlias("base", "layouts/base.njk");
  eleventyConfig.addLayoutAlias("episode", "layouts/episode.njk");

  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj).toISODate();
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