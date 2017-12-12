<?php

function marker_output_span($marker){

  return '<span class="marker_elem"  id="' . $marker['id'] . '">
          <p class="lat">'. $marker['lat'] . '</p><p>, </p><p class="lng">' . $marker['lng'] . '</p>
          <input onclick="toggleDistButton();" name="original" type="radio">
          <input onclick="toggleDistButton();" name="destination" type="radio">
          <input onclick="toggleDelButton();" name="forRemoval" type="checkbox">
          </span>';
}
