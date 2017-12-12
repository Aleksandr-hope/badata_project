<?php

require 'geo_func.php';
require $_SERVER['DOCUMENT_ROOT'] . '/rb-mysql.php';

R::setup('mysql:host=127.0.0.1;dbname=badata_geo', 'root', '');
if (!R::testConnection()) {
  exit('No connection to DB.');
}
var_dump($_POST['markers']);
if (isset($_POST['markers'])) {
  $arr = $_POST['markers'];

  foreach ($arr as $marker) {
    add_marker_to_db($marker);
  }
} else {
  echo geo_output('data', 'Bad query');
}

function add_marker_to_db($marker) {
  $geometka = R::dispense('geometka');
  $geometka->lat = $marker['lat'];
  $geometka->len = $marker['lat'];

  R::store($geometka);
}
