---
layout: baseHero
---

<h1 class="journey title is-4">
    Follow me on a journey through every episode of <a href="http://thescifichristian.com/">The Sci-Fi Christian podcast</a> {% icon "fast-forward" %}
</h1>

# Recommendations
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

<div class="level stats">
    <div class="level-item has-text-centered">
        <div>
            <p class="heading">Last Update</p>
            <p class="title">{{ '' | today | readableDate }}</p>
        </div>
    </div>
    <div class="level-item has-text-centered">
        <div>
            <p class="heading">Eps Aired</p>
            <p class="title">{{ fetchdata.totalEpisodes }}</p>
        </div>
    </div>
    <div class="level-item has-text-centered">
        <div>
            <p class="heading">Eps catalogued</p>
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

<div class="testimonials columns">
    <div class="column is-one-half">
        <div class="testimonial matt" data-name="Matt Anderson">
            My favorite site on the entire Internet.
        </div>
    </div>
    <div class="column is-one-half">
        <div class="testimonial ben" data-name="Ben De Bono">
            I cannot tell you how much I love this...This is my favorite thing any listener has done.
        </div>
    </div>
</div>

<!-- <article class="message is-warning">
    <div class="message-header">
        Progress Stopped
    </div>
    <div class="message-body">
        Cannot complete the next episode until I: <strong>watch {% work "Looper" %}</strong>
    </div>
</div> -->