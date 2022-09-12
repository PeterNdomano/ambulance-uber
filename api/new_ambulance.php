<?php

require_once dirname(__FILE__).'/conn.php';
require_once dirname(__FILE__).'/functions.php';

if($_SERVER['REQUEST_METHOD'] == 'POST') {
  if(User::checkLogin() === true) {
    $user = User::getLoggedInUser();
    if($user->isAdmin()) {
      if(
        isPostFieldValid('regNo') &&
        isPostFieldValid('hospitals') &&
        isPostFieldValid('routes')
      ){
        $regNo = htmlspecialchars($_POST['regNo']);
        $hospitals = htmlspecialchars($_POST['hospitals']);
        $routes = htmlspecialchars($_POST['routes']);

        $img = getUploadedImage('img');


        if($img) {
          //db play

          $sql = $conn->prepare("INSERT INTO ambulances
            ( regNo, hospitals, routes, img )
            VALUES ( ?, ?, ?, ? )");
          $sql->bind_param('ssss', $regNo, $hospitals, $routes, $img);
          if($sql->execute()) {
            echo json_encode(array(
              'status' => 1,
              'msg' => 'Added successfully',
            ));
          }
          else {
            echo json_encode(array(
              'status' => 0,
              'msg' => 'Could not Post your item, please contact support',
            ));
          }
        }
        else {
          echo json_encode(array(
            'status' => 0,
            'msg' => 'Please upload atleast image for this ambulance',
          ));
        }
      }
      else {
        echo json_encode(array(
          'status' => 0,
          'msg' => 'Invalid input data',
        ));
      }
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
