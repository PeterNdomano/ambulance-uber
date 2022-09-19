<?php

require_once dirname(__FILE__).'/conn.php';
require_once dirname(__FILE__).'/functions.php';

if($_SERVER['REQUEST_METHOD'] == 'POST') {
  if(User::checkLogin() === true) {
    $user = User::getLoggedInUser();
    if($user->isAdmin()) {
      if( isPostFieldValid('itemId') ){
        $itemId = htmlspecialchars($_POST['itemId']);
        $status = htmlspecialchars($_POST['status']);

        //db play
        $sql = $conn->prepare("UPDATE ambulances SET status = ? WHERE id = ?");
        $sql->bind_param('ss', $status, $itemId);
        if($sql->execute()) {
          echo json_encode(array(
            'status' => 1,
            'msg' => 'Deleted successfully',
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
