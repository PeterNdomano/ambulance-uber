<?php

require_once dirname(__FILE__).'/conn.php';
require_once dirname(__FILE__).'/functions.php';

if($_SERVER['REQUEST_METHOD'] == 'POST') {
  if(User::checkLogin() === true) {
    $user = User::getLoggedInUser();
    if($user->isBuyer()) {
      if( isPostFieldValid('name') && isPostFieldValid('country') && isPostFieldValid('region') && isPostFieldValid('description') ) {
        $name = htmlspecialchars($_POST['name']);
        $country = htmlspecialchars($_POST['country']);
        $region = htmlspecialchars($_POST['region']);
        $description = htmlspecialchars($_POST['description']);
        $ffo = $user->createMarket(
          $name,
          $country,
          $region,
          $description
        );
        echo json_encode($ffo);
      }
      else {
        echo json_encode(array(
          'status' => 0,
          'msg' => 'Invalid request',
        ));
      }
    }
    else {
      echo json_encode(array(
        'status' => 0,
        'msg' => 'Invalid request, you already have a market',
      ));
    }
  }
  else {
    echo json_encode(array(
      'status' => 0,
      'msg' => 'Not logged in, please login',
    ));
  }
}
else {
  echo json_encode(array(
    'status' => 0,
    'msg' => 'Invalid request',
  ));
}
?>
