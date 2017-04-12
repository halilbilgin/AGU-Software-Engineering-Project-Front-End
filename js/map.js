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

	function onMapClick(e) {
		popup
			.setLatLng(e.latlng)
			.setContent("You clicked the map at " + e.latlng.toString())
			.openOn(mymap);

			if(x==1){
				L.marker(e.latlng).addTo(mymap)
					.bindPopup("iOT Device").openPopup();
				x=-1;
			}

			if(x==2){
				L.marker(e.latlng).addTo(mymap)
					.bindPopup("Base Station").openPopup();
				x=-1;
			}

	}

	mymap.on('click', onMapClick);
