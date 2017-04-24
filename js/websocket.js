if (! ( "WebSocket" in window) ){
    // The browser doesn't support WebSocket
    alert("WebSocket NOT supported by your Browser!");

 }

// Let us open a web socket
var ws = new WebSocket("ws://217.112.83.250:443/");

ws.onopen = function()
{
// Web Socket is connected, send data using send()
  ws.send("Message to send");
};

ws.onmessage = function (evt)
{
  var received_msg = JSON.parse(evt.data);
  console.log(received_msg);
    Highcharts.chart('container', {
    chart: {
        type: 'line'
    },
    title: {
        text: 'Monthly Average Temperature'
    },
    subtitle: {
        text: 'Source: WorldClimate.com'
    },
    xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yAxis: {
        title: {
            text: 'Device Info'
        }
    },
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true
            },
            enableMouseTracking: false
        }
    },
    series: [{
        name: 'Tokyo',
        data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
    }, {
        name: 'London',
        data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
    }]
});
};

ws.onclose = function()
{
// websocket is closed.
  alert("Connection is closed...");
};
