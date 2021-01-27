module.exports = function (brightness, color, text) {    
    return `
<div class="swatch ${color === 'black' ? 'black' : ''}" 
    style="background-color:var(--color-${color}); color:var(--color-${brightness === 'light' ? 'black' : 'white'});">
    ${text}
</div>`;
}