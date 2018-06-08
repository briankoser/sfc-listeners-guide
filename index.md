---
layout: baseHero
---
<div class="content home">
    
<h1>Recommendations</h1>
<div class="columns recommendations">
    <div class="column is-one-quarter">
        <a href="/episodes/?r=essential">
            <div class="notification is-primary">
                <h2>Essential</h2>
                The best of the best from each season
            </div>
        </a>
    </div>
    <div class="column is-one-quarter">
        <a href="/episodes/?r=listen">
            <div class="notification is-success">
                <h2>Listen</h2>
                The episodes that stand the test of time
            </div>
        </a>
    </div>
    <div class="column is-one-quarter">
        <a href="/episodes/0001-pilot/">
            <div class="notification is-danger">
                <h2>All</h2>
                Start at № 1 (for the completionists)
            </div>
        </a>
    </div>
    <div class="column is-one-quarter">
        <a href="{{ collections.episodes[0].data.last.url }}">
            <div class="notification is-warning">
                <h2>Latest</h2>
                № {{ collections.episodes[0].data.last.number }} {{ collections.episodes[0].data.last.title }}
            </div>
        </a>
    </div>
</div>

<div class="columns historical-record">
    <div class="column is-half">
        <h1>Stats and Minutiae</h1>
            The guide is not transcripts or even show notes (usually), just a collection of trivia I found interesting:

- [When did Ben first sing “Avataaaaaar”](/episodes/0015-top-5-sci-fi-worlds)?
- [Which three superhero shows did Matt correctly predict?](/episodes/0029-superhero-summer-movies-recap)
- [How many episodes have had a Stan Lee Quote of the Week?](/stats)

And more!
    </div>
</div>

<div class="level stats">
    <div class="level-item has-text-centered">
        <div>
            <p class="heading">Last Update</p>
            <p class="title">{{ '' | today | readableDate }}</p>
        </div>
    </div>
    <div class="level-item has-text-centered">
        <div>
            <p class="heading">Total Episodes</p>
            <!-- <p class="title">{{ '' | totalSfcEpisodes }}</p> -->
            <p class="title">{{ metadata.totalEpisodes }}</p>
        </div>
    </div>
    <div class="level-item has-text-centered">
        <div>
            <p class="heading">Episodes catalogued</p>
            <p class="title">{{ collections.episodes.length }}</p>
        </div>
    </div>
    <div class="level-item has-text-centered">
        <div>
            <p class="heading">Essential</p>
            <p class="title">{{ collections.episodes[0].data.stats.counts.essential }}</p>
        </div>
    </div>
    <div class="level-item has-text-centered">
        <div>
            <p class="heading">Listen</p>
            <p class="title">{{ collections.episodes[0].data.stats.counts.yes }}</p>
        </div>
    </div>
    <div class="level-item has-text-centered">
        <div>
            <p class="heading">Skip</p>
            <p class="title">{{ collections.episodes[0].data.stats.counts.no }}</p>
        </div>
    </div>
</div>
</div>