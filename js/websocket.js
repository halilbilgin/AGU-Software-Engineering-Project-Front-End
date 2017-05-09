if (! ( "WebSocket" in window) ){
    // The browser doesn't support WebSocket
    alert("WebSocket NOT supported by your Browser!");

 }

// Let us open a web socket
var ws = new WebSocket("ws://195.181.211.72:443/");
var chart;


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
            text: 'Device Information'
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

        series: [
          {name: 'Device 1',
          data: data},
          {name: 'Device 2',
          data1:data1},
          {name: 'Device 3',
          data2:data2},
          {name: 'Device 4',
          data2:data3},
          {name: 'Device 5',
          data2:data4}

      ]

    });
};

ws.onmessage = function (evt)
{
  var received_msg = JSON.parse(evt.data);
  if(received_msg.generalCharts[0].x == 0)
    return false;

  data.push( [new Date(received_msg.generalCharts[0].x*100), received_msg.generalCharts[0].y]);
  chart.series[0].setData(data, true);

  data1.push( [new Date(received_msg.generalCharts[1].x*100), received_msg.generalCharts[1].y]);
  chart.series[1].setData(data1, true);

  data2.push( [new Date(received_msg.generalCharts[2].x*100), received_msg.generalCharts[2].y]);
  chart.series[2].setData(data2, true);

  data3.push( [new Date(received_msg.generalCharts[3].x*100), received_msg.generalCharts[3].y]);
  chart.series[3].setData(data3, true);

  data4.push( [new Date(received_msg.generalCharts[4].x*100), received_msg.generalCharts[4].y]);
  chart.series[4].setData(data4, true);

  }
ws.onclose = function()
{
// websocket is closed.
  alert("Connection is closed...");
};
