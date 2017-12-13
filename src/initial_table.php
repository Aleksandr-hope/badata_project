<?php

require 'rb-mysql.php';
require 'marker_output.php';
require $_SERVER['DOCUMENT_ROOT'] . '/src/db_connect.php';
db_connect_setup();

$markers = R::findAll( 'geometka' );
$markers = R::exportAll($markers);
foreach ($markers as $marker){
  echo marker_output_span($marker);
}

R::close();
