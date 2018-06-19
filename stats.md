---
layout: page
pageTitle: Stats
---
All stats are through episode № {{ collections.episodes.length }}

<div class="columns">
<div class="column is-two-thirds">

## Episodes

<div class="standalone-stat">
<b>Time Loops</b>

{{collections.episodes[0].data.stats.episodes.timeloops}}
</div>

<div class="standalone-stat">
<b>Visits to Other Podcasts</b>

{{collections.episodes[0].data.stats.episodes.visits}}
</div>

<div class="standalone-stat">
<b>Oldest Episode Not Time Looped</b>

№ {{collections.episodes[0].data.stats.episodes.oldestWithoutTimeLoop.number}} {{collections.episodes[0].data.stats.episodes.oldestWithoutTimeLoop.title}}
</div>

<div class="standalone-stat">
<b>Quickest Time Loop</b>

№ {{collections.episodes[0].data.stats.episodes.quickestTimeLoop.number}} {{collections.episodes[0].data.stats.episodes.quickestTimeLoop.title}} ({{collections.episodes[0].data.stats.episodes.quickestTimeLoop.gap}} episodes between original and time loop)
</div>

<!-- Longest 

Shortest

Average Length -->

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
        <div id="chart-tag-{{tag.name | slug}}" class="sfc-chart sfc-bar-chart"></div>
        <script>
            document.addEventListener('DOMContentLoaded', function () {
                let chartContainer = document.getElementById('chart-tag-{{tag.name | slug}}');
                let options = {
                    barWidth: 16,
                    chartHeight: 60,
                    labelFontSize: 18
                };
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