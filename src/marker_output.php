<?php

function marker_output_span($marker){

  return '<span class="marker_elem" id="' . $marker['id'] . '">'
          . $marker['lat'] . ', ' . $marker['lng'] .
          '<input name="original" type="radio">
          <input name="destination" type="radio">
          <input name="forRemoval" type="checkbox">
          </span>';
}
