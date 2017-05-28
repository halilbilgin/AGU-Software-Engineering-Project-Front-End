$(function() {

  $.ajax({
    url: 'configurations.xml'
  }).done(function(data) {
    options = $(data).find('options');

    $(options).find('configuration-pane').find('hardware-platforms').find('item').each(function(x,y) {
    	$('select[name=hardware]').append('<option value="'+$(y).text()+'">'+$(y).text()+'</option>');
    })

    $(options).find('configuration-pane').find('os-image').find('item').each(function(x,y) {
    	$('select[name=os-image]').append('<option value="'+$(y).text()+'">'+$(y).text()+'</option>');
    })

    $(options).find('configuration-pane').find('location').find('item').each(function(x,y) {

    	$('select[name=location]').append('<option value="'+$(y).text()+'">'+$(y).text()+'</option>');
    })

    $(options).find('configuration-pane').find('protocol').find('item').each(function(x,y) {
    	$('select[name=protocol]').append('<option value="'+$(y).text()+'">'+$(y).text()+'</option>');
    })

    if($(options).find('results-area pdf').text() != 'true') {
      $('#sf-results-pane-header .nav-item:eq(1)').hide();
    }

    if($(options).find('results-area cdf').text() != 'true') {
      $('#sf-results-pane-header .nav-item:eq(2)').hide();
    }

    if($(options).find('results-area instant-graph').text() != 'true') {
      $('#sf-results-pane-header .nav-item:eq(0)').hide();
    }
  });
  function iotCheck () {
    check = deviceInfo[1].value == 'Hardware Platform' || deviceInfo[2].value == 'OS Image'
       || deviceInfo[3].value == 'Location' || deviceInfo[4].value == 'Protocol'
       || deviceInfo[5].value == "" || deviceInfo[6].value == "";

    return check;
  }

  function baseCheck() {
    check = deviceInfo[1].value == "";

    return check;
  }
    $(document).on('click', '.add', function() {

    deviceInfo = $(this).closest('form').serializeArray();

    if(deviceInfo[0].value == 'iot-device'){
      if (iotCheck()){
           alert("Please fill all the parts.");
           deviceInfo=null;
         }
    } else if(deviceInfo[0].value == 'base-stations'){
      if (baseCheck()){
         alert("Please fill all the parts.");
         deviceInfo=null;
       }
    }

    if(deviceInfo!=null){
      if(allDevices.length==0 && deviceInfo[0].value=='iot-device'){
        alert('Deploy Base First');
        deviceInfo=null;
      }
    }
  })

  $(document).on('click', '.deploy', function () {
    deviceInfo = $(this).closest('form').serializeArray();

    if(allDevices.length==0){
      alert('Deploy Base First');
      deviceInfo=null;
    }

    if(iotCheck() || deviceInfo[7].value == null) {
      alert("Please fill all the parts.");
      return false;
    }

    addRandomMarkers(deviceInfo[7].value);
    deviceInfo = null;

  })
})
