---
layout: page
pageTitle: Stats
---
All stats are through episode № {{ collections.episodes.length }}

<div class="columns">
<div class="column is-two-thirds">

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

<div class="standalone-stat">
<b>Shortest Episode Title</b>

{{ collections.episodes[0].data.stats.episodes.shortestTitle | join(", ") }}
</div>

<div class="standalone-stat">
<b>Longest Episode Title</b>

{{ collections.episodes[0].data.stats.episodes.longestTitle | join(", ") }}
</div>



### Duplicate Titles
<table class="table is-striped">
    <thead>
        <tr>
            <th>Title</th>
            <th>Total</th>
            <th>First</th>
            <th>Last</th>
        </tr>
    </thead>
    <tbody>
    {% for title in collections.episodes[0].data.stats.episodes.duplicateTitles %}    
<tr>
    <th>{{title.title}}</th>
    <td>{{title.count}}</td>
    <td>№ {{title.first}}</td>
    <td>№ {{title.last}}</td>
</tr>
    {% endfor %}
</tbody>
</table>



### Recurring Segments
<table class="table is-striped">
    <thead>
        <tr>
            <th>Segment</th>
            <th>Total</th>
            <th>First</th>
            <th>Last</th>
            <th>Seasons</th>
        </tr>
    </thead>
    <tbody>
    {% for tag in collections.episodes[0].data.stats.tags %}    
<tr>
    <th>{{tag.name}}</th>
    <td>{{tag.count}}</td>
    <td>№ {{tag.first}}</td>
    <td>№ {{tag.last}}</td>
    <td>
        <!-- {{tag.seasons}} -->
        <!-- <svg height="50" width="100">
        <g>
            <rect x="2" y="15" width="16" fill="var(--color-primary)" height="35">7</rect>
            <text x="5" y="46" font-family="Consolas, monospace" font-size="18" fill="white">1</text>
            <rect x="18" y="0" width="16" fill="var(--color-primary)" height="50">10</rect>
            <text x="20" y="46" font-family="Consolas, monospace" font-size="18" fill="white">2</text>
            <rect x="34" y="40" width="16" fill="var(--color-primary)" height="10">2</rect>
            <text x="36" y="46" font-family="Consolas, monospace" font-size="18" fill="white">3</text>
        </g>
        </svg> -->
        <div id="chart-tag-{{tag.name | slug}}" class="sfc-chart"></div>
        <script>
            document.addEventListener('DOMContentLoaded', function () {
                let chartContainer = document.getElementById('chart-tag-{{tag.name | slug}}');
                let options = {'height': 50, 'barWidth': 16};
                sfcChart.createBarChart(chartContainer, {{tag.seasons}}, options);
            });
        </script>
    </td>
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