var map;
var markers = [];

window.onload = function() {
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
//Toggle delete button disable attr
function toggleDelButton() {
  if ($('#marker_tab input:checkbox:checked').length == 0) {
    $('#table_buttons .del_but input').prop('disabled', true);
  } else {
    $('#table_buttons .del_but input').prop('disabled', false);
  }
}

//Remove geolocations from list
function remMarkersList() {
  if ($('#marker_tab input:checkbox:checked').length > 0) {
    var arr = [];
    $('#marker_tab input:checkbox:checked').each(function () {
      arr.push($(this).parent().attr('id'));
    });
    $.ajax({
      type: 'POST',
      url: 'src/delete_markers.php',
      dataType: 'json',
      data: {"del_markers": arr},
      success: function (result) {
        $.each(JSON.parse(result.deleted), function(index, value){
          $('#marker_tab #' + value).remove();
        });
      },
      error: function () {
        console.log('error');
      }
    });
  }
}