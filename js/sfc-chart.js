(function (window, document) {
    "use strict";

    let defaultSettings = {
        barColor: getComputedStyle(document.body).getPropertyValue('--color-primary'),
        labelColor: getComputedStyle(document.body).getPropertyValue('--color-white'),
        labelFontFamily: 'Consolas, monospace'
    };
    let svgNS = 'http://www.w3.org/2000/svg';

    function createBarChart (container, data, options) {
        let settings = Object.assign({}, defaultSettings, options);
        let svg = document.createElementNS(svgNS, 'svg');
        svg.setAttribute('height', settings.chartHeight);
        svg.setAttribute('width', (settings.barWidth + (settings.barMargin || 0)) * data.length);

        let barX = 2; // starting point on x-axis
        let heightMultiplier = Math.round(settings.chartHeight / Math.max(...data));

        for (let i = 0; i < data.length; i++) {
            let height = data[i] * heightMultiplier;
            let rect = document.createElementNS(svgNS, 'rect');
            rect.setAttribute('x', barX);
            rect.setAttribute('y', settings.chartHeight - height)
            rect.setAttribute('width', settings.barWidth);
            rect.setAttribute('fill', settings.barColor);
            rect.setAttribute('height', height);
            let title = document.createElementNS(svgNS, 'title');
            let titleTextNode = document.createTextNode(data[i]);
            title.appendChild(titleTextNode);
            rect.appendChild(title);
            svg.appendChild(rect);

            let text = document.createElementNS(svgNS, 'text');
            let textX = barX + (i === 0 ? 3 : 2); // the 1 needs to start 3px left, all other seasons are 2px
            text.setAttribute('x', textX);
            text.setAttribute('y', settings.chartHeight - 4);
            text.setAttribute('font-family', settings.labelFontFamily);
            text.setAttribute('font-size', settings.labelFontSize);
            text.setAttribute('fill', settings.labelColor);
            let textTextNode = document.createTextNode(i + 1);
            text.appendChild(textTextNode);
            text.appendChild(title);
            svg.appendChild(text);

            barX += settings.barWidth + (settings.barMargin || 0);
        }

        container.appendChild(svg);
    }

    function createStackedBarChart (container, data, options) {
        let settings = Object.assign({}, defaultSettings, options);
        let svg = document.createElementNS(svgNS, 'svg');
        svg.setAttribute('height', settings.chartHeight);
        svg.setAttribute('width', (settings.barWidth + settings.barMargin || 0) * data.length);

        let barX = 2; // starting point on x-axis
        let maxSeasonEpisodeCount = Math.max(...data.map(arr => arr.reduce((a, b) => a + b, 0)));
        let heightMultiplier = Math.round(settings.barHeight / maxSeasonEpisodeCount);

        for (let i = 0; i < data.length; i++) {
            let season = data[i];
            let barY = settings.barHeight;
            for (let j = 0; j < season.length; j++) {
                let height = season[j] * heightMultiplier;
                let rect = document.createElementNS(svgNS, 'rect');
                rect.setAttribute('x', barX);
                barY -= height;
                rect.setAttribute('y', barY);
                rect.setAttribute('width', settings.barWidth);
                rect.setAttribute('fill', settings.colors[j]);
                rect.setAttribute('height', height);

                let title = document.createElementNS(svgNS, 'title');
                let titleTextNode = document.createTextNode(season[j]);
                title.appendChild(titleTextNode);
                rect.appendChild(title);
                svg.appendChild(rect);
            }

            let text = document.createElementNS(svgNS, 'text');
            text.setAttribute('x', barX + 10);
            text.setAttribute('y', settings.chartHeight - 8);
            text.setAttribute('font-family', settings.labelFontFamily);
            text.setAttribute('font-size', settings.labelFontSize);
            text.setAttribute('fill', settings.labelColor);

            let textTextNode = document.createTextNode(i + 1);
            
            let textTitle = document.createElementNS(svgNS, 'title');
            let textTitleTextNode = document.createTextNode(`Season ${i + 1}`);
            textTitle.appendChild(textTitleTextNode)

            text.appendChild(textTextNode);
            text.appendChild(textTitle);
            svg.appendChild(text);

            barX += settings.barWidth + settings.barMargin;
        }

        container.appendChild(svg);

        createLegend(container, options);
    }

    function createLegend (container, options) {
        if (options.legend === undefined) {
            return;
        }

        let ol = document.createElement('ol');
        ol.classList.add('chart-legend');

        for (let i = 0; i < options.legend.length; i++) {
            let li = document.createElement('li');
            li.innerText = options.legend[i].title;
            li.style.color = options.legend[i].color;
            ol.appendChild(li);
        }

        container.appendChild(ol);
    }

    window.sfcChart = {};
    window.sfcChart.createBarChart = createBarChart;
    window.sfcChart.createStackedBarChart = createStackedBarChart;
}(window, document));