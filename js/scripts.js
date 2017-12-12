//Toggle delete button disable attr
function toggleDelButton() {
  if ($('#marker_tab input:checkbox:checked').length == 0) {
    $('#table_buttons .del_but input').prop('disabled', true);
  } else {
    $('#table_buttons .del_but input').prop('disabled', false);
  }
}

//Toggle distance button disable attr
function toggleDistButton() {
  if ($('#marker_tab input:radio[name="original"]:checked').length > 0 && $('#marker_tab input:radio[name="destination"]:checked').length > 0) {
    $('#table_buttons .distance_but input[name="distance"]').prop('disabled', false);
  } else {
    $('#table_buttons .distance_but input[name="distance"]').prop('disabled', true);
    $('#table_buttons .distance_but input[name="dist_value"]').val('');
  }
};

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
        $.each(JSON.parse(result.deleted), function (index, value) {
          $('#marker_tab #' + value).remove();
        });
        $('#table_buttons .del_but input').prop('disabled', true);
        toggleDistButton();
      },
      error: function () {
        console.log('error');
      }
    });
  }
}
