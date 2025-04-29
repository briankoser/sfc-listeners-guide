document.addEventListener("DOMContentLoaded", function(event) { 
  let data = {
    labels: ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
    series: [
      [0,  0,   0,   0,   0,   0,   0,   163, 289, 337, 516, 533,  556,  570 ],
      [39, 100, 215, 315, 431, 533, 620, 693, 777, 867, 998, 1077, 1121, 1164],
    ]
  };
  
  let options = {
    axisX: {
      position: 'end'
    },
    axisY: {
      type: Chartist.FixedScaleAxis,
      ticks: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100],
      low: 0
    },
    chartPadding: {
      left: 10
    }
  };
  
  new Chartist.Line('#guide-progress-chart', data, options);
});