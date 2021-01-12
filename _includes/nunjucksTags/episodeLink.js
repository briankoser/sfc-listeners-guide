module.exports = function(nunjucksEngine) {
    return new function() {
        this.tags = ["episodeLink"];

        this.parse = function(parser, nodes, lexer) {
            var tok = parser.nextToken();

            var args = parser.parseSignature(null, true);
            parser.advanceAfterBlockEnd(tok.value);

            return new nodes.CallExtensionAsync(this, "run", args);
        };

        this.run = function(context, number, callback) {
            let episodes = context.ctx.collections.episode.filter(e => e.data.number == number);
            let link = '';

            if (episodes.length) {
                let {url} = episodes[0];
                let title = episodes[0].data.title;
                link = new nunjucksEngine.runtime.SafeString(`<a href="${url}">№ ${number} ${title}</a>`);
            }
            else {
                console.log(`Episode ${number} not found in \`episodeLink\` Nunjucks tag.`);
            }

            callback(null, link);
        };
    }();
}