<?php

require_once dirname(__FILE__).'/conn.php';
require_once dirname(__FILE__).'/functions.php';

if($_SERVER['REQUEST_METHOD'] == 'POST') {
  if(User::checkLogin() === true) {
    $user = User::getLoggedInUser();
    if($user->isAdmin()) {
      if(
        isPostFieldValid('itemId') &&
        isPostFieldValid('regNo') &&
        isPostFieldValid('hospitals') &&
        isPostFieldValid('routes')
      ){

        $regNo = htmlspecialchars($_POST['regNo']);
        $itemId = htmlspecialchars($_POST['itemId']);
        $hospitals = htmlspecialchars($_POST['hospitals']);
        $routes = htmlspecialchars($_POST['routes']);
        $ambData = getAmbData($itemId);

        $img = getUploadedImage('img');
        $img = ($img) ? $img : $ambData['img'];

        if($img) {
          //db play

          $sql = $conn->prepare("UPDATE ambulances SET
            regNo = ?,
            hospitals = ?,
            routes = ?,
            img = ?
            WHERE id = ?");
          $sql->bind_param('sssss', $regNo, $hospitals, $routes, $img, $itemId);
          if($sql->execute()) {
            echo json_encode(array(
              'status' => 1,
              'msg' => 'Edited successfully',
            ));
          }
          else {
            echo json_encode(array(
              'status' => 0,
              'msg' => 'Could not edit your item, please contact support',
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
