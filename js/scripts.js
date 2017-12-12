var map;
var markers = [];

function initMap() {
  var initMarker = {lat: 50.450721, lng: 30.522986};
  // Create a map object and specify the DOM element for display.
  map = new google.maps.Map(document.getElementById('map'), {
    center: initMarker,
    zoom: 12,
    mapTypeControl: true,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
      mapTypeIds: ['roadmap', 'terrain']
    },
    streetViewControl: false,
    fullscreenControl: false
  });

  map.addListener('click', function (event) {
    addMarker(event.latLng);
  });
}

// Adds a marker to the map and push to the array.
function addMarker(location) {
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });
  markers.push(marker);
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  markers = [];
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setMapOnAll(null);
}

// Add current markers to the list
function addMarkersToList() {
  var data = [];
  if (markers.length !== 0) {
    $.each(markers, function (index, value) {
      data[index] = {lat: value.getPosition().lat(), lng: value.getPosition().lng()};
    });

    $.ajax({
      url: "src/add_markers.php",
      type: "post",
      dataType: 'json',
      data: {"markers": data},
      success: function (result) {
        console.log(result.data);
      }
    });
  }

}