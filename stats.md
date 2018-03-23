---
layout: page
pageTitle: Stats
---
All stats are through episode № {{ collections.episodes.length }}

## Hosts
<div class="hosts columns">
    <div class="column is-two-thirds">
        {% for host in collections.episodes[0].data.stats.hosts %}
<div class="card {{host.name}}">
    <header class="card-header">
        <p class="card-header-title">
            {{host.name | fullName}}
        </p>
    </header>
    <div class="card-content">
        <div class="level host-stats">
            <div class="level-item has-text-centered">
                <div>
                    <p class="heading">Episodes</p>
                    <p class="title">{{host.count}}</p>
                </div>
            </div>
            <div class="level-item has-text-centered">
                <div>
                    <p class="heading">First</p>
                    <p class="title">{{host.first}}</p>
                </div>
            </div>
            <div class="level-item has-text-centered">
                <div>
                    <p class="heading">Last</p>
                    <p class="title">{{host.last}}</p>
                </div>
            </div>
            <div class="level-item has-text-centered">
                <div>
                    <p class="heading">Weakness</p>
                    <p class="title">{{host.name | weakness}}</p>
                </div>
            </div>
            <div class="level-item has-text-centered">
                <div>
                    <p class="heading">Color</p>
                    <p class="title {{host.name}}">{{host.name | color}}</p>
                </div>
            </div>
        </div>
    </div>
</div>
        {% endfor %}
</div>
</div>

<!-- Longest episode
Shortest episode
Quickest time loop

Episodes released by day of the week, month

Blog stats -->