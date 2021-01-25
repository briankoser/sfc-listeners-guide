module.exports = function (data) {
    let countdown = (name, list, extra) => `
<div class="column ${name.toLowerCase()}">
  <h3>${name}</h3>
  <ol reversed>
  ${list.map(entry => 
    `<li>${entry}</li>`
  ).join('\n')}
  </ol>
  <ul class="runner-ups">
    ${extra == undefined ? '' : extra.map(entry => 
        `<li>${entry}</li>`
    ).join('\n')}
  </ul>
</div>`;

    return `
<div class="top-five">
  <h2 class="has-text-centered">${data.title}</h2>
  <div class="columns">
    ${data.ben == undefined ? '' : countdown('Ben', data.ben.list, data.ben.extra)}
    ${data.matt == undefined ? '' : countdown('Matt', data.matt.list, data.matt.extra)}
    ${data.daniel == undefined ? '' : countdown('Daniel', data.daniel.list, data.daniel.extra)}
    ${data.koby == undefined ? '' : countdown('Koby', data.koby.list, data.koby.extra)}
    ${data.guests == undefined ? '' : data.guests.map(c => countdown(c.name, c.list, c.extra)).join('\n')}
  </div>
</div>`;
}