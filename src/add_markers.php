<?php
require $_SERVER['DOCUMENT_ROOT'] . '/src/marker_output.php';
require $_SERVER['DOCUMENT_ROOT'] . '/rb-mysql.php';

R::setup('mysql:host=127.0.0.1;dbname=badata_geo', 'root', '');
if (!R::testConnection()) {
  exit('No connection to DB.');
}

if (isset($_POST['markers'])) {
  $arr = $_POST['markers'];
  $output = '';
  foreach ($arr as $marker) {
    $geometka = add_marker_to_db($marker);
    $output .= marker_output_span($geometka);
  }
  echo json_encode(array('data' => $output));
}
else {
  echo json_encode(array('data' => 'Bad'));
}
R::close();

function add_marker_to_db($marker) {
   $geometka = R::findOrCreate( 'geometka', [
        'lat' => $marker['lat'], 
        'lng' => $marker['lng']] );

  R::store($geometka);
  return $geometka;
}
