<?php

require_once dirname(__FILE__).'/conn.php';
require_once dirname(__FILE__).'/functions.php';

if($_SERVER['REQUEST_METHOD'] == 'POST') {
  if(User::checkLogin() === true) {
    $user = User::getLoggedInUser();
    if($user->isVerifiedSeller()) {
      if(
        isPostFieldValid('itemId') &&
        isPostFieldValid('title') &&
        isPostFieldValid('price') &&
        isPostFieldValid('unit') &&
        isPostFieldValid('quantity') &&
        isPostFieldValid('description')
      ){
        $itemId = htmlspecialchars($_POST['itemId']);
        $title = htmlspecialchars($_POST['title']);
        $price = htmlspecialchars($_POST['price']);
        $quantity = htmlspecialchars($_POST['quantity']);
        $unit = htmlspecialchars($_POST['unit']);
        $description = htmlspecialchars($_POST['description']);
        $market = $user->getUserMarket();
        $goodData = getGoodData($itemId);

        if(intval($market['id']) === intval($goodData['marketId'])) {
          $img1 = getUploadedImage('img1');
          $img2 = getUploadedImage('img2');
          $img3 = getUploadedImage('img3');

          //retain unchanged imgs
          $img1 = ($img1) ? $img1 : $goodData['img1'];
          $img2 = ($img2) ? $img2 : $goodData['img2'];
          $img3 = ($img3) ? $img3 : $goodData['img3'];

          //db play
          $marketId = $market['id'];
          $sql = $conn->prepare("UPDATE goods SET
            title = ?,
            price = ?,
            description = ?,
            img1 = ?,
            img2 = ?,
            img3 = ?,
            unit = ?,
            quantity = ?
            WHERE id = ?
          ");
          $sql->bind_param('sssssssss', $title, $price, $description, $img1, $img2, $img3, $unit, $quantity, $itemId);
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
            'msg' => 'Invalid reuest',
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
