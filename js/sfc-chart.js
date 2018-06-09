(function (window, document) {
    "use strict";

    let settings = {
        chart: {
            color: getComputedStyle(document.body).getPropertyValue('--color-primary')
        },
        labels: {
            color: getComputedStyle(document.body).getPropertyValue('--color-white'),
            font: {
                family: 'Consolas, monospace',
                size: 18
            }
        }
    }

    function createBarChart (container, data, options) {
        let svgNS = 'http://www.w3.org/2000/svg';
        let svg = document.createElementNS(svgNS, 'svg');
        svg.setAttribute('height', options.height);
        svg.setAttribute('width', options.barWidth * data.length);

        let barX = 2; // starting point on x-axis
        let heightMultiplier = Math.round(options.height / Math.max(...data));

        for (let i = 0; i < data.length; i++) {
            let height = data[i] * heightMultiplier;
            let rect = document.createElementNS(svgNS, 'rect');
            rect.setAttribute('x', barX);
            rect.setAttribute('y', options.height - height)
            rect.setAttribute('width', options.barWidth);
            rect.setAttribute('fill', settings.chart.color);
            rect.setAttribute('height', height);
            let title = document.createElementNS(svgNS, 'title');
            let titleTextNode = document.createTextNode(data[i]);
            title.appendChild(titleTextNode);
            rect.appendChild(title);
            svg.appendChild(rect);

            let text = document.createElementNS(svgNS, 'text');
            let textX = barX + (i === 0 ? 3 : 2); // the 1 needs to start 3px left, all other seasons are 2px
            text.setAttribute('x', textX);
            text.setAttribute('y', options.height - 4);
            text.setAttribute('font-family', settings.labels.font.family);
            text.setAttribute('font-size', settings.labels.font.size);
            text.setAttribute('fill', settings.labels.color);
            let textTextNode = document.createTextNode(i + 1);
            text.appendChild(textTextNode);
            text.appendChild(title);
            svg.appendChild(text);

            barX += options.barWidth;
        }

        container.appendChild(svg);

        // <svg height="50" width="100">
        // <g>
        //     <rect x="2" y="15" width="16" fill="var(--color-primary)" height="35">7</rect>
        //     <text x="5" y="46" font-family="Consolas, monospace" font-size="18" fill="white">1</text>
        //     <rect x="18" y="0" width="16" fill="var(--color-primary)" height="50">10</rect>
        //     <text x="20" y="46" font-family="Consolas, monospace" font-size="18" fill="white">2</text>
        //     <rect x="34" y="40" width="16" fill="var(--color-primary)" height="10">2</rect>
        //     <text x="36" y="46" font-family="Consolas, monospace" font-size="18" fill="white">3</text>
        // </g>
        // </svg>
    }

    window.sfcChart = {};
    window.sfcChart.createBarChart = createBarChart;
}(window, document));