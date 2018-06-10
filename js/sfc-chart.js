(function (window, document) {
    "use strict";

    let defaultSettings = {
        primaryColor: getComputedStyle(document.body).getPropertyValue('--color-primary'),
        yesColor: getComputedStyle(document.body).getPropertyValue('--color-green'),
        noColor: getComputedStyle(document.body).getPropertyValue('--color-red'),
        labelColor: getComputedStyle(document.body).getPropertyValue('--color-white'),
        labelFontFamily: 'Consolas, monospace'
    };
    let svgNS = 'http://www.w3.org/2000/svg';

    function createBarChart (container, data, options) {
        let settings = Object.assign({}, defaultSettings, options);
        let svg = document.createElementNS(svgNS, 'svg');
        svg.setAttribute('height', settings.chartHeight);
        svg.setAttribute('width', (settings.chartBarWidth + (settings.chartBarMargin || 0)) * data.length);

        let barX = 2; // starting point on x-axis
        let heightMultiplier = Math.round(settings.chartHeight / Math.max(...data));

        for (let i = 0; i < data.length; i++) {
            let height = data[i] * heightMultiplier;
            let rect = document.createElementNS(svgNS, 'rect');
            rect.setAttribute('x', barX);
            rect.setAttribute('y', settings.chartHeight - height)
            rect.setAttribute('width', settings.chartBarWidth);
            rect.setAttribute('fill', settings.primaryColor);
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

            barX += settings.chartBarWidth + (settings.chartBarMargin || 0);
        }

        container.appendChild(svg);
    }

    function createStackedBarChart (container, data, options) {
        let settings = Object.assign({}, defaultSettings, options);
        let svg = document.createElementNS(svgNS, 'svg');
        svg.setAttribute('height', settings.chartHeight);
        svg.setAttribute('width', (settings.chartBarWidth + settings.chartBarMargin || 0) * data.length);

        let barX = 2; // starting point on x-axis
        let maxSeasonEpisodeCount = Math.max(...data.map(arr => arr.reduce((a, b) => a + b, 0)));
        let heightMultiplier = Math.round(settings.chartBarHeight / maxSeasonEpisodeCount);
        let colors = [settings.primaryColor, settings.yesColor, settings.noColor];

        for (let i = 0; i < data.length; i++) {
            let season = data[i];
            let barY = settings.chartBarHeight;
            for (let j = 0; j < season.length; j++) {
                let height = season[j] * heightMultiplier;
                let rect = document.createElementNS(svgNS, 'rect');
                rect.setAttribute('x', barX);
                barY -= height;
                rect.setAttribute('y', barY);
                rect.setAttribute('width', settings.chartBarWidth);
                rect.setAttribute('fill', colors[j]);
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

            barX += settings.chartBarWidth + settings.chartBarMargin;
        }

        container.appendChild(svg);

        // <svg height="120" width="220">
        // <g>
        //     <rect x="2" y="15" width="32" fill="#f00" height="15"></rect>
        //     <rect x="2" y="30" width="32" fill="#0f0" height="20"></rect>
        //     <rect x="2" y="50" width="32" fill="#00f" height="40"></rect>
        //     <text x="12" y="112" font-family="Consolas, monospace" font-size="24" fill="white">1</text>

        //     <rect x="44" y="0" width="32" fill="var(--color-primary)" height="90">10</rect>
        //     <text x="54" y="112" font-family="Consolas, monospace" font-size="24" fill="white">2</text>

        //     <rect x="86" y="40" width="32" fill="var(--color-primary)" height="50">2</rect>
        //     <text x="96" y="112" font-family="Consolas, monospace" font-size="24" fill="white">3</text>
        // </g>
        // </svg>
    }

    window.sfcChart = {};
    window.sfcChart.createBarChart = createBarChart;
    window.sfcChart.createStackedBarChart = createStackedBarChart;
}(window, document));