var mymap = L.map('mapid').setView([51.505, -0.09], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
			'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="http://mapbox.com">Mapbox</a>',
		id: 'mapbox.streets'
	}).addTo(mymap);

	//L.marker([51.5, -0.09]).addTo(mymap)
	//	.bindPopup("It is a base station.").openPopup();

	var popup = L.popup();

	var baseIcon = L.icon({
	    iconUrl: 'img/baseS.png',
	    iconSize:     [30, 30], // size of the icon

			popupAnchor:  [-3, -15] // point from which the popup should open relative to the iconAnchor
	});

	var iotIcon = L.icon({
	    iconUrl: 'img/iotD.png',
	    iconSize:     [30, 30], // size of the icon

			popupAnchor:  [-3, -15] // point from which the popup should open relative to the iconAnchor
	});

	function onMapClick(e) {
		popup
			.setLatLng(e.latlng)
			.setContent("You clicked the map at " + e.latlng.toString())
			.openOn(mymap);
			if(! deviceInfo) {
				return false;
			}

			deviceInfo[deviceInfo.length] = {name:'latlng', value:e.latlng};
			console.log(deviceInfo);
			var baseMarker = L.marker(e.latlng, {icon: baseIcon});
			var iotMarker = L.marker(e.latlng, {icon: iotIcon});
			allMarkers.push(baseMarker, iotMarker);

			if(deviceInfo[0].value == 'iot-device'){
				var dist=distance(deviceInfo[8].value.lat,deviceInfo[8].value.lng, allDevices[0][4].value.lat, allDevices[0][4].value.lng);
					iotMarker.addTo(mymap)
					   .bindPopup("<b>IoT Device</b>" + "<br>Distance from BaseStation: " + dist + "<br>Hardware: " + deviceInfo[1].value
					              + "<br>OS Image: " + deviceInfo[2].value + "<br>Protocol: " + deviceInfo[4].value).openPopup();
			} else if(deviceInfo[0].value == 'base-stations'){

					baseMarker.addTo(mymap)
					   .bindPopup("<b>Base Station</b><br> Antenna Height (m): " + deviceInfo[1].value
					 					    + "<br>Antenna Tilt: " + deviceInfo[2].value + "<br>#Sectors: " + deviceInfo[3].value).openPopup();
			}
		
			deviceInfo[deviceInfo.length] = {name:'dist', value:dist};
			allDevices.push(deviceInfo);
			deviceInfo = null;
	}

	function distance(lat1, lon1, lat2, lon2) {
	  var p = 0.017453292519943295;    // Math.PI / 180
	  var c = Math.cos;
	  var a = 0.5 - c((lat2 - lat1) * p)/2 +
	          c(lat1 * p) * c(lat2 * p) *
	          (1 - c((lon2 - lon1) * p))/2;

	  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
	}

	function clear(){
		for(var i = 0; i < this.allMarkers.length; i++){
    	removeLayer(this.allMarkers[i]);
}
	}


	mymap.on('click', onMapClick);
