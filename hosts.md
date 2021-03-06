---
layout: page
pageTitle: Hosts
---
All stats are through episode № {{ collections.episodes.length }}. The {{collections.episodes[0].data.stats.episodes.spinoffs}} spinoff episodes are included.

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
            <th>Guest</th>
            <th>Appearances</th>
            <th>First</th>
            <th>Last</th>
        </tr>
    </thead>
    <tbody>
    {% for guest in collections.episodes[0].data.stats.guests %}    
<tr>
    <td>{{guest.name}}</td>
    <td>{{guest.count}}</td>
    <td>№ {{guest.first}}</td>
    <td>№ {{guest.last}}</td>
</tr>
    {% endfor %}
</tbody>
</table>

</div>
</div>