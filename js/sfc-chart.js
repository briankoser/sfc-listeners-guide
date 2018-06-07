(function (window, document) {
    "use strict";

    function createBarChart (container, data, options) {
        let svg = document.createElement('svg');
        svg.setAttribute('height', options.height);
        svg.setAttribute('width', options.barWidth * data.length);

        let g = document.createElement('g');

        for (let i = 0; i < data.length; i++) {
            let rect = document.createElement('rect');
            rect.setAttribute('x', 2); // running count from 2, increment by barWidth
            // y - determined by data
            rect.setAttribute('width', options.barWidth);
            rect.setAttribute('fill', 'var(--color-primary)');
            // height - determined by data
            // inner text - don't set?
            g.appendChild(rect);
        }

        svg.appendChild(g);
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