<?php

require_once dirname(__FILE__).'/conn.php';
require_once dirname(__FILE__).'/functions.php';

if($_SERVER['REQUEST_METHOD'] == 'POST') {
  if(User::checkLogin() === true) {
    $user = User::getLoggedInUser();
    if(
      isPostFieldValid('from') &&
      isPostFieldValid('to') &&
      isPostFieldValid('creditCard') &&
      isPostFieldValid('cvv') &&
      isPostFieldValid('exp') &&
      isPostFieldValid('itemId')
    ) {
      $location = htmlspecialchars($_POST['from']);
      $destination = htmlspecialchars($_POST['to']);
      $itemId = htmlspecialchars($_POST['itemId']);
      $creditCard = htmlspecialchars($_POST['creditCard']);
      $exp = htmlspecialchars($_POST['exp']);
      $cvv = htmlspecialchars($_POST['cvv']);

      $allowedCard = array(
        'number' => '4565787698761654',
        'cvv' => '898',
        'exp' => '11/22',
      );

      if(
        $allowedCard['number'] === $creditCard &&
        $allowedCard['cvv'] === $cvv &&
        $allowedCard['exp'] === $exp
      ) {
        $sql = $conn->prepare("INSERT INTO bookings
          ( location, destination, userId, ambId )
          VALUES ( ?, ?, ?, ?)
        ");
        $sql->bind_param('ssss', $location, $destination, $user->id, $itemId );
        $sql->execute();
        echo json_encode(array(
          'status' => 1,
          'msg' => 'Success',
        ));
      }
      else {
        echo json_encode(array(
          'status' => 0,
          'msg' => 'Could not process Credit Card',
        ));
      }

    }
    else {
      echo json_encode(array(
        'status' => 0,
        'msg' => 'Invalid input',
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
