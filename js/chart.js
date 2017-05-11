function gaussPdf(params, containerId, title) {
    var gaussData = [];
    var firstMean = params[0].mean;

    for(i = 0; i < params.length; i++) {
      var data=[];

      for(j = firstMean-10; j < firstMean+30;j++) {
        data.push(1/(Math.sqrt(2*Math.PI)*params[i].sd) *
          Math.exp(-1/2 * Math.pow((j-params[i].mean) / params[i].sd, 2)))
      }

      gaussData.push({
        name: 'Device '+ i,
        data: data
      });
    }

    Highcharts.chart(containerId,  {
        chart: {
            type: 'spline'
        },
        title: {
            text: title
        },
        legend: {
            enabled:true
        },
        xAxis: {
        },
        yAxis: {
            title: {
                text: 'Fruit units'
            }
        },
        tooltip: {
            enabled:false
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            enabled:false
        },
        series: gaussData,
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
        available = true;
    for(var point in platforms) {
      if(Math.abs(point.x-x) < platformSize) {
        available = false;
        break;
      }
    }
    if(available) {
      platforms.push(x);
      placed += 1;
    }
    maxAttempts -= 1;
  }
  return platforms;
}
function normalcdf(mean, sigma, to)
{

    var z = (to-mean)/Math.sqrt(2*sigma*sigma);
    var t = 1/(1+0.3275911*Math.abs(z));
    var a1 =  0.254829592;
    var a2 = -0.284496736;
    var a3 =  1.421413741;
    var a4 = -1.453152027;
    var a5 =  1.061405429;
    var erf = 1-(((((a5*t + a4)*t) + a3)*t + a2)*t + a1)*t*Math.exp(-z*z);
    var sign = 1;
    if(z < 0)
    {
        sign = -1;
    }
    return (1/2)*(1+sign*erf);
}

function cdf (params) {
  var gaussData = [];
  var firstMean = params[params.length-1].mean;
  var firstSd = params[params.length-1].sd;
  for(i = 0; i < params.length; i++) {
    var data=[];

    for(j = firstMean-2*firstSd; j < firstMean+3*firstSd;j++) {
      data.push(normalcdf(params[i].mean, params[i].sd, j))
    }

    gaussData.push({
      name: 'Device '+ i,
      data: data
    });
  }
Highcharts.chart('cdf-container', {
             chart: {
                 type: 'spline'
             },
             title: {
                 text: 'Cumulative distribution'
             },
             subtitle: {
                 text: ''
             },
             xAxis: {

             },
             yAxis: {
                 title: {
                     text: ' Density'
                 },
                 min: 0,
 				max: 1
             },
             tooltip: {
                 headerFormat: '<b>{series.name}</b><br>',
                 pointFormat: '{point.x:.2f} ; {point.y:.2f}',
 				crosshairs: true,
             },
 plotOptions: {
             series: {
                 marker: {
                     enabled: false
                 }
             }
         },
             series: gaussData
         });
}
