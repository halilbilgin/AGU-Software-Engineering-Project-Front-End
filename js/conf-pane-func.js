$(function() {
    $(document).on('click', '.add', function() {

    deviceInfo = $(this).closest('form').serializeArray();

    if(deviceInfo[0].value == 'iot-device'){
      if (deviceInfo[1].value == 'Hardware Platform' || deviceInfo[2].value == 'OS Image'
         || deviceInfo[3].value == 'Location' || deviceInfo[4].value == 'Protocol'
         || deviceInfo[5].value == null || deviceInfo[6].value == null){
           alert("Please fill all the parts.");
           deviceInfo=null;
         }
    } else if(deviceInfo[0].value == 'base-stations'){
      if (deviceInfo[1].value == null || deviceInfo[2].value == null
         || deviceInfo[3].value == null){
           alert("Please fill all the parts.");
           deviceInfo=null;
         }
    }

    if(allDevices.length==0 && deviceInfo[0].value=='iot-device'){
    alert('Deploy Base First');
      deviceInfo=null;
   }
     else alert('Choose a location');



  })
})
