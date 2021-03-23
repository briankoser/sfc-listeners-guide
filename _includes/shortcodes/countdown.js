module.exports = function (data) {
  let container = (name, list, extra) => `
<div class="column ${name.toLowerCase()}">
  <h3>${name}</h3>
  ${countdown(list)}
  ${runnerUps(extra)}
</div>`;

  let countdown = (list) => list == undefined ? '' : `
<ol reversed>
${list.map(entry => 
  `<li>${entry}</li>`
).join('\n')}
</ol>`;

  let runnerUps = (list) => list == undefined ? '' : `
<ul class="runner-ups">
${list.map(entry => 
  `<li>${entry}</li>`
).join('\n')}
</ul>`;

  return `
<div class="top-five">
  <h2 class="has-text-centered">${data.title}</h2>
  <div class="columns">
    ${data.ben == undefined ? '' : container('Ben', data.ben.list, data.ben.extra)}
    ${data.matt == undefined ? '' : container('Matt', data.matt.list, data.matt.extra)}
    ${data.daniel == undefined ? '' : container('Daniel', data.daniel.list, data.daniel.extra)}
    ${data.koby == undefined ? '' : container('Koby', data.koby.list, data.koby.extra)}
    ${data.guests == undefined ? '' : data.guests.map(c => container(c.name, c.list, c.extra)).join('\n')}
  </div>
</div>`;
}