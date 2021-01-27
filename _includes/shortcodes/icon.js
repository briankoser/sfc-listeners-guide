module.exports = function (name) {
    return `
<svg class="feather">
    <use xlink:href="/img/feather-sprite.svg#${name}"/>
</svg>`;
}