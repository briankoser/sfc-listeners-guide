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
      let url =     (episodes[i - 1] || {}).url;
      let title =  ((episodes[i - 1] || {}).data || {}).title;
      let number = ((episodes[i - 1] || {}).data || {}).number;

      episodes[i].data.previous = {url, title, number};

      url =     (episodes[i + 1] || {}).url;
      title =  ((episodes[i + 1] || {}).data || {}).title;
      number = ((episodes[i + 1] || {}).data || {}).number;

      episodes[i].data.next = {url, title, number};
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