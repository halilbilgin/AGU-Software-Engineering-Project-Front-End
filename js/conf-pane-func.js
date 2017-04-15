var allDevices = [];
var allMarkers = [];

var deviceInfo = [];

$(function() {
  $(document).on('click', '.add', function() {

    deviceInfo = $(this).closest('form').serializeArray();
    alert('Choose a location');

  })
})
