var map;
var markers = [];

window.onload = function () {
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
};

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
      type: 'POST',
      url: 'src/add_markers.php',
      dataType: 'json',
      data: {"markers": data},
      success: function (result) {
        $('.marker_table').append(result.data);
        deleteMarkers();
      },
      error: function () {
        console.log('error');
      }
    });
  }
}

//Request and output distance
function distanceButton() {
  if (($('#marker_tab tbody input:radio[name="original"]:checked').length > 0) &&
          ($('#marker_tab tbody input:radio[name="destination"]:checked').length > 0)) {
//    console.log($('#marker_tab tbody input:radio[name="original"]:checked').parent().parent().siblings('.latlng').children('.lat').text());
//    console.log($('#marker_tab input:radio[name="destination"]:checked'));
    var orig_lat = $('#marker_tab tbody input:radio[name="original"]:checked').parent().parent().siblings('.latlng').children('.lat').text();
    var orig_lng = $('#marker_tab tbody input:radio[name="original"]:checked').parent().parent().siblings('.latlng').children('.lng').text();
    var dest_lat = $('#marker_tab tbody input:radio[name="destination"]:checked').parent().parent().siblings('.latlng').children('.lat').text();
    var dest_lng = $('#marker_tab tbody input:radio[name="destination"]:checked').parent().parent().siblings('.latlng').children('.lng').text();
    distanceRequest(orig_lat, orig_lng, dest_lat, dest_lng);
  } else {
    $('#table_buttons .distance_but input[name="dist_value"]').val('');
  }
}
//Google Distance Matrix request
function distanceRequest(orig_lat, orig_lng, dest_lat, dest_lng) {
  var origin1 = new google.maps.LatLng(orig_lat, orig_lng);
  var destination1 = new google.maps.LatLng(dest_lat, dest_lng);
  var service = new google.maps.DistanceMatrixService();
  service.getDistanceMatrix(
          {
            origins: [origin1],
            destinations: [destination1],
            travelMode: 'DRIVING'
          }, distanceCallback);
}
//Callback for request
function distanceCallback(response, status) {
  if (status !== 'OK') {
    console.log('Error was: ' + status);
  } else {
    $('#table_buttons .distance_but input[name="dist_value"]').val(response.rows["0"].elements["0"].distance.text);
  }
}

