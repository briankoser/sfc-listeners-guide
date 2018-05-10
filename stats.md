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