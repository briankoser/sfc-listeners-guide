module.exports = function (questions) {
    return `
<h2>Questions for Matt</h2>
<ol>
${questions.map(question => 
    `<li>${question}</li>`
).join('\n')}
</ol>`;
}