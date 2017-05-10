var allDevices = [];
var allMarkers = [];
var deviceInfo = [];

$(function() {
  $(document).on('click', '.add', function() {

    deviceInfo = $(this).closest('form').serializeArray();
    if(allDevices.length==0 && deviceInfo[0].value=='iot-device'){
      alert('Deploy Base First');
      deviceInfo=null;
    }
    else alert('Choose a location');

  })
})
