<?php

require $_SERVER['DOCUMENT_ROOT'] . '/rb-mysql.php';

R::setup('mysql:host=127.0.0.1;dbname=badata_geo', 'root', '');
if (!R::testConnection()) {
  exit('No connection to DB.');
}
R::freeze( TRUE );

if (isset($_POST['del_markers'])) {
  $ids = $_POST['del_markers'];
  $len = count($ids);
  $output = array();
  if ($len == 1){
    $marker = R::load('geometka', $ids[0]);
    array_push($output, $marker->id);
    R::trash($marker);
  }
  else{
    $markers = R::loadAll('geometka', $ids);
    foreach ($markers as $obj){
      array_push($output, $obj->id);
    }
    R::trashAll($markers);
  }
  $output = json_encode($output);
  echo json_encode(array('deleted' => $output));
}

R::close();
