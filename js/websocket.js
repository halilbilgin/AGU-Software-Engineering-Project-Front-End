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
};

ws.onclose = function()
{
// websocket is closed.
  alert("Connection is closed...");
};
