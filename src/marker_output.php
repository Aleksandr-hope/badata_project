<?php

function marker_output_span($marker) {

  return '<tr class="marker_elem"  id="' . $marker['id'] . '">
          <td class="latlng"><span class="lat">' . $marker['lat'] . '</span><span class="delimiter">,</span><span class="lng">' . $marker['lng'] . '</span></td>
          <td><div>
            <input onclick="toggleDistButton();" name="original" type="radio">
          </div></td>
          <td><div>
            <input onclick="toggleDistButton();" name="destination" type="radio">
          </div></td>
          <td><div>
            <input onclick="toggleDelButton();" name="forRemoval" type="checkbox">
          </div></td>
          </span>';
}
