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
            <!-- <div class="level-item has-text-centered">
                <div>
                    <p class="heading">Prophecy</p>
                    <p class="title">% correct</p>
                </div>
            </div> -->
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

## Episodes

<!-- Longest 

Shortest

Average Length -->

<div>
<b>Quickest Time Loop</b>

№ {{collections.episodes[0].data.stats.episodes.quickestTimeLoop.number}} {{collections.episodes[0].data.stats.episodes.quickestTimeLoop.title}} ({{collections.episodes[0].data.stats.episodes.quickestTimeLoop.gap}} episodes between original and time loop)
</div>

### Release Day
<div class="columns">
<div class="column is-one-fifth">
<table class="table is-striped">
    <tbody>
        {% for day in collections.episodes[0].data.stats.releaseDay %}
<tr>
    <td>{{day.name}}</td>
    <td class="number-column">{{day.count}}</td>
</tr>
        {% endfor %}
</tbody>
</table>
</div>
</div>

<!-- ### Production by Month -->
<!-- percentage of total minutes by month -->

<!-- ### Released Over Time -->
<!-- minutes release per month from 2011-01 to present -->

<!-- ### Stan Lee Quotes of the Week 

<div>
<b>First</b>

{{collections.episodes[0].data.stats.episodes.stanLee.first}}
</div>

<div>
<b>Last</b>

{{collections.episodes[0].data.stats.episodes.stanLee.last}}
</div>

<div>
<b>Total</b>

{{collections.episodes[0].data.stats.episodes.stanLee.count}}
</div> -->