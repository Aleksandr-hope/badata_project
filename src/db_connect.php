<?php

function db_connect_setup() {
  R::setup('mysql:host=127.0.0.1;dbname=badata_geo', 'root', '');
  if (!R::testConnection()) {
    exit('No connection to DB.');
  }
  R::freeze(TRUE);
}

  