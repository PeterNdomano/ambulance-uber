<?php

require_once dirname(__FILE__).'/conn.php';

//declare constants here
define("APP_NAME", "Igolyn");
//end of constants declaration

spl_autoload_register('loadClass');

function loadClass($class){
  $path = dirname(__FILE__).'/classes/';
  $file = $path.$class.'.php';

  if(file_exists($file)){
    require_once $file;
  }
  else {
    echo 'No such file';
  }
}

function startSession() {
  if(session_status() !== PHP_SESSION_ACTIVE) {
    session_start();
  }
}

function sendSms($phone, $msg){
  //..
}

function sendEmail($to, $subject, $msg){
  //uncomment in production
  mail($to, $subject, $msg, "From: IGOLYN <admin@calipa.co.tz>");
}

function getUploadedImage($key) {
  //handle cover photo
  if(isset($_FILES[$key])){
    $fileExtension = strtolower(pathinfo($_FILES[$key]['name'], PATHINFO_EXTENSION));
    $extensions = array('jpg', 'png', 'jpeg', 'webp');
    if(in_array($fileExtension, $extensions)){
      $fileCheck = getimagesize($_FILES[$key]['tmp_name']);
      if($fileCheck !== false){
        if(strpos($fileCheck['mime'], 'image/') === 0){
          if(filesize($_FILES[$key]['tmp_name']) <= 10485760){
            //upload it
            $photo = 'files/'.date("Y-m-d").time().".".$fileExtension;
            if(move_uploaded_file($_FILES[$key]['tmp_name'], $photo)){
              return $photo;
            }
          }
        }
      }
    }
  }

  return null;
}

function isPostFieldValid($key){
  if(isset($_POST[$key])){
    if(!empty(trim(htmlspecialchars($_POST[$key])))){
      return true;
    }
  }

  return false;
}

function unsetSensitiveUserData($info) {
  unset($info['password']);
  unset($info['token']);
  unset($info['otpCode']);
  unset($info['otpExpiry']);

  return $info;
}

function isEmailValid($email) {
  if(filter_var($email, FILTER_VALIDATE_EMAIL)) {
    //more checks to come..
    return true;
  }
  return false;
}

function isPhoneValid($phone) {
  if(intval($phone) > 1000000) {
    //more checks to come.....
    return true;
  }
  return false;
}
function isGetFieldValid($key){
  if(isset($_GET[$key])){
    if(!empty(trim(htmlspecialchars($_GET[$key])))){
      return true;
    }
  }

  return false;
}


function getUserData($id) {
  global $conn;
  $sql = $conn->prepare("SELECT * FROM users WHERE id = ?");
  $sql->bind_param('s', $id);
  $sql->execute();
  $result = $sql->get_result();
  if(mysqli_num_rows($result) === 1) {
    $row = mysqli_fetch_assoc($result);
    return $row;
  }
  else {
    return null;
  }
}

function getAmbData($id) {
  global $conn;
  $sql = $conn->prepare("SELECT * FROM ambulances WHERE id = ?");
  $sql->bind_param('s', $id);
  $sql->execute();
  $result = $sql->get_result();
  if(mysqli_num_rows($result) === 1) {
    $row = mysqli_fetch_assoc($result);
    return $row;
  }
  else {
    return null;
  }
}

function calcMaxBatchIndex($data, $batchSize) {
  if(sizeof($data) === 0) {
    return 0;
  }

  $maxIndex = (sizeof($data) > 0 && sizeof($data) <= $batchSize) ? 1 : floor(sizeof($data) / $batchSize) + 1;
  return $maxIndex;
}

function batchfy($data, $batchSize, $batchIndex) {
  //returns batched data and maximum batchIndex
  $maxIndex = calcMaxBatchIndex($data, $batchSize);
  $startIndex = (intval($batchIndex) === 1) ? 0 : ($batchIndex - 1) * $batchSize;
  $numberOfItems = $batchSize;
  $counter = 0;
  $batchItems = [];
  while( $numberOfItems ) {

    $index = $startIndex + $counter;
    if(isset($data[$index])) {
        array_push($batchItems, $data[$index]);
    }
    ++$counter;
    --$numberOfItems;
  }

  $nextBatchIndex = (($batchIndex + 1) < $maxIndex ) ? $batchIndex + 1 : $maxIndex;

  return array(
    "maxBatchIndex" => $maxIndex,
    "data" => $batchItems,
    "nextBatchIndex" => $nextBatchIndex,
    "sentIndex" => $batchIndex,
  );
}

function getGoodData($id) {
  global $conn;
  $sql = $conn->prepare("SELECT * FROM goods WHERE id = ?");
  $sql->bind_param('s', $id);
  $sql->execute();
  $result = $sql->get_result();
  if(mysqli_num_rows($result) === 1) {
    $row = mysqli_fetch_assoc($result);
    return $row;
  }
  else {
    return null;
  }
}


function getAppConfig() {
  return array(
    'name' => 'IGOLYN',
  );
}

function getMarketData($id) {
  global $conn;
  $sql = $conn->prepare("SELECT * FROM markets WHERE id = ?");
  $sql->bind_param('s', $id);
  $sql->execute();
  $result = $sql->get_result();
  if(mysqli_num_rows($result) === 1) {
    $row = mysqli_fetch_assoc($result);
    return $row;
  }
  else {
    return null;
  }
}

function getNotificationData($id) {
  global $conn;
  $sql = $conn->prepare("SELECT * FROM notifications WHERE id = ?");
  $sql->bind_param('s', $id);
  $sql->execute();
  $result = $sql->get_result();
  if(mysqli_num_rows($result) === 1) {
    $row = mysqli_fetch_assoc($result);
    return $row;
  }
  else {
    return null;
  }
}

function getUserDataByEmail($id) {
  global $conn;
  $sql = $conn->prepare("SELECT * FROM users WHERE email = ?");
  $sql->bind_param('s', $id);
  $sql->execute();
  $result = $sql->get_result();
  if(mysqli_num_rows($result) === 1) {
    $row = mysqli_fetch_assoc($result);
    return $row;
  }
  else {
    return null;
  }
}

function getUserDataByPhone($phone, $countryCode) {
  global $conn;
  $phone = intval($phone);
  $countryCode = intval($countryCode);

  $sql = $conn->prepare("SELECT * FROM users WHERE phone = ? AND countryCode = ?");
  $sql->bind_param('ss', $phone, $countryCode);
  $sql->execute();
  $result = $sql->get_result();
  if(mysqli_num_rows($result) === 1) {
    $row = mysqli_fetch_assoc($result);
    return $row;
  }
  else {
    return null;
  }
}
?>
