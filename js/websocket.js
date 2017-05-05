if (! ( "WebSocket" in window) ){
    // The browser doesn't support WebSocket
    alert("WebSocket NOT supported by your Browser!");

 }

// Let us open a web socket
var ws = new WebSocket("ws://195.181.211.72:443/");
var chart;
var data = [
[new Date(0), 0.7695]
];
ws.onopen = function()
{
// Web Socket is connected, send data using send()
  ws.send("Message to send");
    Highcharts.setOptions({
          global: {
              useUTC: false
          }
      });

      chart =Highcharts.chart('container1', {
        chart: {
            zoomType: 'x'
        },
        title: {
            text: 'Important'
        },
        subtitle: {
            text: document.ontouchstart === undefined ?
                    'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
        },
        xAxis: {
        },
        yAxis: {
            
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, Highcharts.getOptions().colors[0]],
                        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                },
                marker: {
                    radius: 2
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: null
            }
        },

        series: [{
        data: data
        }]
    });
 
};

ws.onmessage = function (evt)
{
  var received_msg = JSON.parse(evt.data);
  if(received_msg.generalCharts[0].x == 0)
    return false;
 
  data.push( [new Date(received_msg.generalCharts[0].x*100), received_msg.generalCharts[0].y]);

  chart.series[0].setData(data, true);
  }
ws.onclose = function()
{
// websocket is closed.
  alert("Connection is closed...");
};
