<?php

require 'rb-mysql.php';
require 'marker_output.php';

R::setup('mysql:host=127.0.0.1;dbname=badata_geo', 'root', '');
if (!R::testConnection()) {
  exit('No connection to DB.');
}

$markers = R::findAll( 'geometka' );
$markers = R::exportAll($markers);
foreach ($markers as $marker){
  echo marker_output_span($marker);
}

R::close();
