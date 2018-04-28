---
layout: page
pageTitle: Stats
---
All stats are through episode № {{ collections.episodes.length }}

<div class="hosts columns">
<div class="column is-two-thirds">

## Hosts
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
                    <p class="title">№ {{host.first}}</p>
                </div>
            </div>
            <div class="level-item has-text-centered">
                <div>
                    <p class="heading">Last</p>
                    <p class="title">№ {{host.last}}</p>
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

<table class="table is-striped">
    <thead>
        <tr>
            <th>Guest Host</th>
            <th>Appearances</th>
            <th>First</th>
            <th>Last</th>
        </tr>
    </thead>
    <tbody>
    {% for host in collections.episodes[0].data.stats.guest_hosts %}    
<tr>
    <td>{{host.name}}</td>
    <td>{{host.count}}</td>
    <td>№ {{host.first}}</td>
    <td>№ {{host.last}}</td>
</tr>
    {% endfor %}
</tbody>
</table>



## Episodes

<!-- Longest 

Shortest

Average Length -->

<div class="standalone-stat">
<b>Oldest Episode Not Time Looped</b>

№ {{collections.episodes[0].data.stats.episodes.oldestWithoutTimeLoop.number}} {{collections.episodes[0].data.stats.episodes.oldestWithoutTimeLoop.title}}
</div>

<div class="standalone-stat">
<b>Quickest Time Loop</b>

№ {{collections.episodes[0].data.stats.episodes.quickestTimeLoop.number}} {{collections.episodes[0].data.stats.episodes.quickestTimeLoop.title}} ({{collections.episodes[0].data.stats.episodes.quickestTimeLoop.gap}} episodes between original and time loop)
</div>



### Segment Count
<table class="table is-striped">
    <thead>
        <tr>
            <th>Segment</th>
            <th>Total</th>
            <th>First</th>
            <th>Last</th>
        </tr>
    </thead>
    <tbody>
    {% for tag in collections.episodes[0].data.stats.tags %}    
<tr>
    <th>{{tag.name}}</th>
    <td>{{tag.count}}</td>
    <td>№ {{tag.first}}</td>
    <td>№ {{tag.last}}</td>
</tr>
    {% endfor %}
</tbody>
</table>



### Release Day
<div class="columns">
<div class="column is-one-third">
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
</div>
</div>