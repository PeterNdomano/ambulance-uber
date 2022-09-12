<?php

require_once dirname(__FILE__).'/conn.php';
require_once dirname(__FILE__).'/functions.php';

if($_SERVER['REQUEST_METHOD'] == 'POST') {
  if(User::checkLogin() === true) {
    $user = User::getLoggedInUser();
    if($user->isVerifiedSeller()) {
      if(
        isPostFieldValid('title') &&
        isPostFieldValid('price') &&
        isPostFieldValid('unit') &&
        isPostFieldValid('quantity') &&
        isPostFieldValid('description')
      ){
        $title = htmlspecialchars($_POST['title']);
        $price = htmlspecialchars($_POST['price']);
        $quantity = htmlspecialchars($_POST['quantity']);
        $unit = htmlspecialchars($_POST['unit']);
        $description = htmlspecialchars($_POST['description']);

        $img1 = getUploadedImage('img1');
        $img2 = getUploadedImage('img2');
        $img3 = getUploadedImage('img3');

        if($img1 || $img2 || $img3) {
          //db play
          $marketId = ($user->getUserMarket())['id'];
          $sql = $conn->prepare("INSERT INTO goods
            (title, price, description, img1, img2, img3, marketId, unit, quantity )
            VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ? )");
          $sql->bind_param('sssssssss', $title, $price, $description, $img1, $img2, $img3, $marketId, $unit, $quantity);
          if($sql->execute()) {
            echo json_encode(array(
              'status' => 1,
              'msg' => 'Posted successfully',
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
            'msg' => 'Please upload atleast one image',
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
