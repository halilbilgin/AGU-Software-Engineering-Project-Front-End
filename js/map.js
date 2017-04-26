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
					iotMarker.addTo(mymap)
					   .bindPopup("<b>IoT Device</b><br>Hardware: " + deviceInfo[1].value
					              + "<br>OS Image: " + deviceInfo[2].value + "<br>Protocol: " + deviceInfo[4].value).openPopup();
			} else if(deviceInfo[0].value == 'base-stations'){
					baseMarker.addTo(mymap)
					   .bindPopup("<b>Base Station</b><br> Antenna Height (m): " + deviceInfo[1].value
					 					    + "<br>Antenna Tilt: " + deviceInfo[2].value + "<br>#Sectors: " + deviceInfo[3].value).openPopup();
			}

			allDevices.push(deviceInfo);

			deviceInfo = null;
	}

	mymap.on('click', onMapClick);
