var allDevices = [];
var deviceInfo = [];

$(function() {
  $(document).on('click', '.add', function() {

    deviceInfo = $(this).closest('form').serializeArray();
    alert('Choose a location');

    // do some choose a location stuff;
    console.log(deviceInfo);
    deviceInfo[deviceInfo.length] = {name:'location', value:'YUKARIDAKI SIZIN YAPTIGINIZ SEYLER'};
    allDevices.push(deviceInfo);

  })
})

var x=-1;

function addIOT(){
  x=1;
}

function addBase(){
  x=2;
}
