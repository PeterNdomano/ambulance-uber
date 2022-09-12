<?php

require_once dirname(__FILE__).'/conn.php';
require_once dirname(__FILE__).'/functions.php';

if($_SERVER['REQUEST_METHOD'] == 'POST') {
  if( isset($_POST['batchIndex']) ) {
    $batchIndex = htmlspecialchars($_POST['batchIndex']);
    $filter = htmlspecialchars($_POST['filter']);
    $searchTerm = htmlspecialchars($_POST['searchTerm']);

    $ffo = Feed::fetch(
      $batchIndex,
      $searchTerm,
      $filter,
    );
    echo json_encode($ffo);
  }
}
else {
  echo json_encode(array(
    'status' => 0,
    'msg' => 'Invalid request',
  ));
}

?>
