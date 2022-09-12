<?php

require_once dirname(__FILE__).'/conn.php';
require_once dirname(__FILE__).'/functions.php';

if($_SERVER['REQUEST_METHOD'] == 'POST') {
  if(
    isset($_POST['email']) &&
    isset($_POST['phone']) &&
    isset($_POST['password']) &&
    isset($_POST['countryCode'])
  ) {
    $email = htmlspecialchars($_POST['email']);
    $phone = htmlspecialchars($_POST['phone']);
    $password = $_POST['password'];
    $countryCode = htmlspecialchars($_POST['countryCode']);
    $ffo = User::login(
      $email,
      $phone,
      $password,
      $countryCode
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
