<!DOCTYPE html>
<html>
  <head>
    <title>MyWorkbench</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <meta name="description" content="Test for BAData">
    <!--CSS-->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="css/style.css">

  </head>
  <body>
    <header>
      <div class="container">
        <h1>Welcome to MyWorkbench!</h1>
      </div>
    </header>

    <section class="MainContainer">
      <div class="geometka_block container">
        <div id="floating-panel">
          <input onclick="addMarkersToList();" type=button value="Add Markers" class="btn btn-light">
          <input onclick="deleteMarkers();" type=button value="Clear Map" class="btn btn-light">
        </div>
        <div id="map"></div>

        <div class="marker_block">
          <table class="marker_table table table-striped" id="marker_tab">
            <caption class="table_title">Список геометок</caption>
            <thead>
              <tr>
                <th>Координаты</th>
                <th>Отправление</th>
                <th>Прибытие</th>
                <th>Удалить</th>
              </tr>
            </thead>
            <tbody>
            <?php include_once 'src/initial_table.php'; ?>
            </tbody>
          </table>
          <div id="table_buttons">
            <div class="distance_but input-group">
              <input onclick="distanceButton();" type="button" name="distance" value="Определить дистанцию"  class="btn btn-light" disabled>
              <input type="text" class="form-control" name="dist_value" value="" disabled>
            </div>
            <div class="del_but input-group">
              <input onclick="remMarkersList();" type="button" name="delete" value="Удалить выбраные метки" class="btn btn-light" disabled>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!--SCRIPTS-->
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDtTQQTxbCDb8lTTzJY_URNaQKdl82qKfI" async defer></script>
    <script src="https://code.jquery.com/jquery-3.2.1.js" integrity="sha256-DZAnKJ/6XZ9si04Hgrsxu/8s717jcIzLy3oi35EouyE=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js" integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ" crossorigin="anonymous"></script>
    <script src="js/scripts.js"></script>
    <script src="js/google_map.js"></script>
  </body>
</html>