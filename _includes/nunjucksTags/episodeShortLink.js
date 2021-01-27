module.exports = function(nunjucksEngine) {
    return new function() {
        this.tags = ["episodeShortLink"];

        this.parse = function(parser, nodes, lexer) {
            var tok = parser.nextToken();

            var args = parser.parseSignature(null, true);
            parser.advanceAfterBlockEnd(tok.value);

            return new nodes.CallExtensionAsync(this, "run", args);
        };

        this.run = function(context, number, callback) {
            let episodes = context.ctx.collections.episode.filter(e => e.data.number == number && e.data.category !== 'spinoff');
            let link = '';

            if (episodes.length) {
                let {url} = episodes[0];
                link = new nunjucksEngine.runtime.SafeString(`<a href="${url}" class="link-subtle">№ ${number}</a>`);
            }
            else {
                console.log(`Episode ${number} not found in \`episodeShortLink\` Nunjucks tag.`);
                link = `№ ${number}`;
            }

            callback(null, link);
        };
    }();
}