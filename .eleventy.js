const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  eleventyConfig.addLayoutAlias("base", "layouts/base.njk");
  eleventyConfig.addLayoutAlias("episode", "layouts/episode.njk");

  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj).toISODate();
  });

  // only content in the `episodes/` directory
  // eleventyConfig.addCollection("episodes", function(collection) {
  //   return collection.getAllSorted().filter(function(item) {
  //     return item.inputPath.match(/^\.\/episodes\//) !== null && item.data.tags !== undefined && item.data.tags.includes('episode');
  //   });
  // });
  eleventyConfig.addCollection("episodes", function(collection) {
    return collection.getFilteredByTag("episode").sort(function(a, b) {
      return a.data.podcast_date - b.data.podcast_date; // sorts oldest first
    });
  });

  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("css");

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