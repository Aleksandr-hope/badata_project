<?php

function geo_output($name, $data) {
  return json_encode(array($name => $data));
}
