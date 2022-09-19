<?php

require_once dirname(__FILE__).'/conn.php';
require_once dirname(__FILE__).'/functions.php';

if($_SERVER['REQUEST_METHOD'] == 'POST') {
  if(User::checkLogin() === true) {
    $user = User::getLoggedInUser();
    if($user->isAdmin()) {
      if( isPostFieldValid('itemId') ){
        $itemId = htmlspecialchars($_POST['itemId']);

        //db play
        $sql = $conn->prepare("UPDATE bookings SET status = 1 WHERE id = ?");
        $sql->bind_param('s', $itemId);
        if($sql->execute()) {
          echo json_encode(array(
            'status' => 1,
            'msg' => 'successful',
          ));
        }
        else {
          echo json_encode(array(
            'status' => 0,
            'msg' => 'Could not delete your item, please contact support',
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
