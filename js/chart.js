function histogram(data, containerId, title) {

    var step = 10;
    var histo = {},
        x,
        i,
        arr = [];

    // Group down
    for (i = 0; i < data.length; i++) {
        x = Math.floor(data[i][0] / step) * step;
        if (!histo[x]) {
            histo[x] = 0;
        }
        histo[x]++;
    }

    // Make the histo group into an array
    for (x in histo) {
        if (histo.hasOwnProperty((x))) {
            arr.push([parseFloat(x), histo[x]]);
        }
    }

    // Finally, sort the array
    arr.sort(function (a, b) {
        return a[0] - b[0];
    });
    Highcharts.chart(containerId, {
        chart: {
            type: 'column'
        },
        title: {
            text: title
        },
        xAxis: {
            gridLineWidth: 1
        },
        yAxis: [{
            title: {
                text: 'Histogram Count'
            }
        }, {
            opposite: true,
            title: {
                text: 'Y value'
            }
        }],
        series: [{
            name: 'Histogram',
            type: 'column',
            data: arr,
            pointPadding: 0,
            groupPadding: 0,
            pointPlacement: 'between'
        }]
    });

}

var platforms = [],
    platformSize = 20,
    platformWidth = 200,
    platformHeight = 200;

function generatePlatforms(k) {
  platforms = [];
  var placed = 0,
      maxAttempts = k*10;
  while(placed < k && maxAttempts > 0) {
    var x = Math.floor(Math.random()*platformWidth),
        y = Math.floor(Math.random()*platformHeight),
        available = true;
    for(var point in platforms) {
      if(Math.abs(point.x-x) < platformSize && Math.abs(point.y-y) < platformSize) {
        available = false;
        break;
      }
    }
    if(available) {
      platforms.push([x, y]);
      placed += 1;
    }
    maxAttempts -= 1;
  }
  return platforms;
}
