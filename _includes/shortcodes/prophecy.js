module.exports = function (prophecy) {
    let titleCase = (word) => word == undefined ? '' : word.toString().charAt(0).toUpperCase() + word.toString().slice(1);

    return `
<div class="prophecy clearfix">
    <header class="host ${prophecy.host.toLowerCase()}">
        <div>${prophecy.host}</div>
    </header>
    <div class="prediction">
        ${prophecy.prediction}
    </div>
    <div class="veracity ${prophecy.veracity}" title="${titleCase(prophecy.veracity)}">
        ${prophecy.comments == undefined ? '' : prophecy.comments}
    </div>
</div>`; 
}