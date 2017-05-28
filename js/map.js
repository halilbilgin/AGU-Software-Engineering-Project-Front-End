
	function addRandomMarkers(times) {
		for(i = 0; i < times; i++) {
			var lat = getRandomInRange(allDevices[0][4].value.lat-0.05, allDevices[0][4].value.lat+0.05, 10);
			var lng = getRandomInRange(allDevices[0][4].value.lng - 0.1, allDevices[0][4].value.lng + 0.1	, 10);
			var iotMarker = L.marker({lat:lat, lng:lng}, {icon: iotIcon});

			var cloneDeviceInfo = jQuery.extend(true, {}, deviceInfo);
			cloneDeviceInfo[8] = {name:'latlng', value:{lat: lat, lng:lng}};
			var dist=distance(cloneDeviceInfo[8].value.lat,cloneDeviceInfo[8].value.lng, allDevices[0][4].value.lat, allDevices[0][4].value.lng);
			cloneDeviceInfo[cloneDeviceInfo.length] = {name:'dist', value:dist};

			iotMarker.addTo(mymap)
				 .bindPopup("<b>IoT Device</b>" + "<br>Distance from BaseStation: " + dist + "<br>Hardware: " + deviceInfo[1].value
										+ "<br>OS Image: " + deviceInfo[2].value + "<br>Protocol: " + deviceInfo[4].value);
			allMarkers.push(iotMarker);
			allDevices.push(cloneDeviceInfo);
			cluster.addLayer(iotMarker);
			mymap.addLayer(cluster);
		}
	}

	function onMapClick(e) {


			if(! deviceInfo) {
				return false;
			}

			deviceInfo[deviceInfo.length] = {name:'latlng', value:e.latlng};

			var baseMarker = L.marker(e.latlng, {icon: baseIcon});
			var iotMarker = L.marker(e.latlng, {icon: iotIcon});

			if(deviceInfo[0].value == 'iot-device'){
				var dist=distance(deviceInfo[8].value.lat,deviceInfo[8].value.lng, allDevices[0][4].value.lat, allDevices[0][4].value.lng);
					iotMarker.addTo(mymap)
					   .bindPopup("<b>IoT Device</b>" + "<br>Distance from BaseStation: " + dist + "<br>Hardware: " + deviceInfo[1].value
					              + "<br>OS Image: " + deviceInfo[2].value + "<br>Protocol: " + deviceInfo[4].value);
					allMarkers.push(iotMarker);
			} else if(deviceInfo[0].value == 'base-stations'){

					baseMarker.addTo(mymap)
					   .bindPopup("<b>Base Station</b><br> Antenna Height (m): " + deviceInfo[1].value
					 					    + "<br>Antenna Tilt: " + deviceInfo[2].value + "<br>#Sectors: "
						      					+ deviceInfo[3].value);
					allMarkers.push(baseMarker);
			}

			if(deviceInfo[0].value == 'iot-device'){
				deviceInfo[deviceInfo.length] = {name:'dist', value:dist};
				cluster.addLayer(iotMarker);
			}

			allDevices.push(deviceInfo);
			mymap.addLayer(cluster);
			deviceInfo = null;
	}

	function distance(lat1, lon1, lat2, lon2) {
	  var p = 0.017453292519943295;    // Math.PI / 180
	  var c = Math.cos;
	  var a = 0.5 - c((lat2 - lat1) * p)/2 +
	          c(lat1 * p) * c(lat2 * p) *
	          (1 - c((lon2 - lon1) * p))/2;

	  return Math.round(12742 * Math.asin(Math.sqrt(a))*1000*100)/100; // 2 * R; R = 6371 km
	}

	function clear(){
		for(var i = 0; i < this.allMarkers.length; i++){
    	removeLayer(this.allMarkers[i]);
}
	}

	function getRandomInRange(from, to, fixed) {
        return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
  }
	function getRandomInt(min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}
var mymap;
var cluster;
var popup;
var baseIcon;
var iotIcon;
$(function() {
	$(document).on('click','.leaflet-marker-icon', function(){
		$(this).removeClass('blinking');
	})
	$('body').height(window.innerHeight+70);
	mymap = L.map('mapid', {scrollWheelZoom:false, minZoom:13}).setView([38.742152, 35.470884], 15);
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
			maxZoom: 15,
			attribution: 'Keysight Technologies',
			id: 'mapbox.streets'
		}).addTo(mymap);

		cluster = new L.MarkerClusterGroup();

		//L.marker([51.5, -0.09]).addTo(mymap)
		//	.bindPopup("It is a base station.").openPopup();

		popup = L.popup();

		baseIcon = L.icon({
		    iconUrl: 'img/baseS.png',
		    iconSize:     [30, 30], // size of the icon
				popupAnchor:  [-3, -15] // point from which the popup should open relative to the iconAnchor
		});

		iotIcon = L.icon({
		    iconUrl: 'img/iotD.png',
		    iconSize:     [30, 30], // size of the icon
				popupAnchor:  [-3, -15] // point from which the popup should open relative to the iconAnchor
		});
		mymap.on('click', onMapClick);

})
