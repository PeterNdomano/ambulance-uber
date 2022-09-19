<?php

require_once dirname(__FILE__).'/../conn.php';
require_once dirname(__FILE__).'/../functions.php';

/**
 * All user functionality
 */
class User {
  public $id;
  function __construct($id){
    $this->id = $id;
    $this->app = new App();
  }

  public function getData() {
    return getUserData($this->id);
  }



  public function getShowData() {
    //this fetches basic data that may be needed for application to work


    //info data
    $info = unsetSensitiveUserData($this->getData());
    $info['phone'] = ($info['usePhone']) ? ("+".$info['countryCode']." ".$info['phone']) : $info['phone'] ;

    //rides n bookings
    $rides = $this->getRides();
    $allRides = $this->getAllRides();
    //more to come eg orders etc....

    return array(
      "info" => $info,
      "rides" => $rides,
      "allRides" => $allRides,
    );

  }

  public function getAmbs() {
    global $conn;
    $sql = $conn->prepare("SELECT * FROM ambulances ORDER BY id DESC");
    $sql->execute();
    $result = $sql->get_result();
    if(mysqli_num_rows($result) > 0) {
      $data = [];
      while ($row = mysqli_fetch_assoc($result)) {
        array_push($data, $row);
      }
      return $data;
    }
    return null;
  }

  public function getAllRides() {
    global $conn;
    $sql = $conn->prepare("SELECT * FROM bookings ORDER BY id DESC");
    $sql->execute();
    $result = $sql->get_result();
    if(mysqli_num_rows($result) > 0) {
      $data = [];
      while ($row = mysqli_fetch_assoc($result)) {
        $row['ambData'] = getAmbData($row['ambId']);
        array_push($data, $row);
      }
      return $data;
    }
    return null;
  }


  public function getRides() {
    global $conn;
    $sql = $conn->prepare("SELECT * FROM bookings WHERE userId = ? ORDER BY id DESC");
    $sql->bind_param('s', $this->id);
    $sql->execute();
    $result = $sql->get_result();
    if(mysqli_num_rows($result) > 0) {
      $data = [];
      while ($row = mysqli_fetch_assoc($result)) {
        $row['ambData'] = getAmbData($row['ambId']);
        array_push($data, $row);
      }
      return $data;
    }
    return null;
  }

  public function sendVerificationCode() {
    global $conn;
    $ffo = array(
      'status' => 0,
      'msg' => 'Could not send verification code, please request again',
    );

    $userData = $this->getData();

    //generate verification code
    $code = $this->generateOtp();

    //send verification code
    if($userData['usePhone']) {
      //send as sms
      sendSms($userData['countryCode'].$userData['phone'], "Your Account verification code is ".$code);
      $ffo = array(
        'status' => 1,
        'msg' => 'Verification code was sent to your phone number',
      );
    }
    else {
      //send via email
      sendEmail(
        $userData['email'],
        "Account Verification Code",
        "Your Account verification code is ".$code
      );
      $ffo = array(
        'status' => 1,
        'msg' => 'Verification code was sent to your email address',
      );
    }

    return $ffo;
  }

  public function notify($msg, $subject = "Something new from".APP_NAME) {
    //this sends email or sms to user
    $userData = $this->getData();

    // COMBAK: send as sms also if user added his/her phone
    if($userData['usePhone']) {
      //send as sms
      sendSms($userData['countryCode'].$userData['phone'], $msg);
    }
    else {
      //send via email
      sendEmail(
        $userData['email'],
        $subject,
        $msg
      );
    }
  }

  public function generateOtp() {
    global $conn;
    $userData = $this->getData();
    $otpCode = rand(111111, 999999);
    $otpExpiry = time() + (15 * 60); //fifteen minutes expiry
    $sql = $conn->prepare("UPDATE users SET otpCode = ?, otpExpiry = ? WHERE id = ?");
    $sql->bind_param('sss', $otpCode, $otpExpiry, $userData['id']);
    $sql->execute();
    return $otpCode;
  }

  public function verifyOtp($otpCode, $forAccountVerification = false) {
    global $conn;
    $ffo = array(
      'status' => 0,
      'msg' => 'Could not verify your code, please try again',
    );
    $userData = $this->getData();
    if(time() <= intval($userData['otpExpiry'])) {
      if(intval($otpCode) === intval($userData['otpCode'])) {
        if($forAccountVerification) {
          $sql = $conn->prepare("UPDATE users SET status = 1 WHERE id = ?");
          $sql->bind_param('s', $this->id);
          $sql->execute();
        }
        $ffo = array(
          'status' => 1,
          'msg' => 'Code was verified',
        );
      }
      else {
        $ffo = array(
          'status' => 0,
          'msg' => 'Invalid Code',
        );
      }
    }
    else {
      $ffo = array(
        'status' => 0,
        'msg' => 'Code has expired, please request another one',
      );
    }

    return $ffo;
  }



  public function createMarket(
    $name,
    $country,
    $region,
    $description
  ){
    global $conn;
    $ffo = array(
      'status' => 0,
      'msg' => 'Could not create your market, please contact support',
    );

    $market = $this->getUserMarket();
    if(is_null($market)) {
      $sql = $conn->prepare("INSERT INTO markets ( name, country, region, description, userId ) VALUES ( ?, ?, ?, ?, ? )");
      $sql->bind_param('sssss', $name, $country, $region, $description, $this->id);
      if($sql->execute()) {
        //update role
        $sql = $conn->prepare("UPDATE users SET role = 'seller' WHERE id =  ?");
        $sql->bind_param('s', $this->id);
        $sql->execute();

        //send notification
        Notification::send(
          $this->id,
          "Your market was created, please wait for verification from Administrator"
        );
        $ffo = array(
          'status' => 1,
          'msg' => 'Market was created',
        );
      }
      else {
        $ffo = array(
          'status' => 0,
          'msg' => 'Could not create new market due to server error, please contact support',
        );
      }
    }
    else {
      $ffo = array(
        'status' => 0,
        'msg' => 'Could not create new market, you already have a market',
      );
    }

    return $ffo;
  }

  public function isAdmin() {
    $userData = $this->getData();
    if(strtolower($userData['role']) === 'admin') {
      return true;
    }
    return false;
  }

  public function isVerified() {
    $userData = $this->getData();
    if(intval($userData['status']) === 1) {
      return true;
    }
    return false;
  }

  public function isBuyer() {
    $userData = $this->getData();
    if(strtolower($userData['role']) === 'buyer') {
      return true;
    }
    return false;
  }

  static function register($email, $phone, $password, $countryCode) {
    global $conn;
    $ffo = array(
      'status' => 0,
      'msg' => 'Premature termination',
    );

    $usePhone = false;
    $useEmail = false;
    if(strlen(trim($email)) > 0 && isEmailValid($email)) {
      $useEmail = true;
    }

    if(strlen(trim($phone)) > 0 && isPhoneValid($phone) && strlen(trim($countryCode)) > 0) {
      $usePhone = true;
      //then format numbers
      $phone = intval($phone);
      $countryCode = intval($countryCode);
    }

    if($useEmail xor $usePhone) {
      $userData = ($useEmail) ? getUserDataByEmail($email) : getUserDataByPhone($phone, $countryCode);
      if(is_null($userData)) {

        //preparing db insert
        $password = password_hash($password, PASSWORD_DEFAULT);
        $token = password_hash($email.$phone, PASSWORD_DEFAULT);
        $sql = ($useEmail) ?
          $conn->prepare("INSERT INTO users (
            email, password, token, useEmail
          ) VALUES ( ?, ?, ?, ? )")
          :
          $conn->prepare("INSERT INTO users (
            phone, countryCode, password, token, usePhone
          ) VALUES ( ?, ?, ?, ?, ? )");

        //binding params
        if($useEmail) {
          $sql->bind_param('ssss', $email, $password, $token, $useEmail);
        }
        else {
          $sql->bind_param('sssss', $phone, $countryCode, $password, $token, $usePhone);
        }

        //execute query
        if($sql->execute()) {
          $userId = $sql->insert_id;
          startSession();
          $_SESSION['amUberUserId'] = $userId;
          $_SESSION['amUberUserToken'] = $token;
          $ffo = array(
            'status' => 1,
            'msg' => 'Account was created',
          );
        }
        else {
          $ffo = array(
            'status' => 0,
            'msg' => 'Server error, could not create your account.',
          );
        }

      }
      else {
        $ffo = array(
          'status' => 0,
          'msg' => 'Email or Phone already in use',
        );
      }
    }
    else {
      $ffo = array(
        'status' => 0,
        'msg' => 'Invalid Email or Phone',
      );
    }



    return $ffo;
  }

  static function login($email, $phone, $password, $countryCode) {
    global $conn;
    $ffo = array(
      'status' => 0,
      'msg' => 'Premature termination',
    );

    $usePhone = false;
    $useEmail = false;
    if(strlen(trim($email)) > 0 && isEmailValid($email)) {
      $useEmail = true;
    }

    if(strlen(trim($phone)) > 0 && isPhoneValid($phone) && strlen(trim($countryCode)) > 0) {
      $usePhone = true;
      //then format numbers
      $phone = intval($phone);
      $countryCode = intval($countryCode);
    }

    if($useEmail xor $usePhone) {
      $userData = ($useEmail) ? getUserDataByEmail($email) : getUserDataByPhone($phone, $countryCode);
      if(!is_null($userData)) {

        //verify pasword
        if(password_verify($password, $userData['password'])) {
          //set session
          startSession();
          $_SESSION['amUberUserId'] = $userData['id'];
          $_SESSION['amUberUserToken'] = $userData['token'];
          $ffo = array(
            'status' => 1,
            'msg' => 'Login successful',
          );
        }
        else {
          $ffo = array(
            'status' => 0,
            'msg' => 'Wrong details',
          );
        }

      }
      else {
        $ffo = array(
          'status' => 0,
          'msg' => 'Wrong details',
        );
      }
    }
    else {
      $ffo = array(
        'status' => 0,
        'msg' => 'Invalid Email or Phone',
      );
    }

    return $ffo;
  }

  static function checkLogin() {
    startSession();
    if(isset($_SESSION['amUberUserId']) && isset($_SESSION['amUberUserToken'])) {
      $userId = htmlspecialchars($_SESSION['amUberUserId']);
      $userToken = $_SESSION['amUberUserToken'];
      $userData = getUserData($userId);
      if($userData['token'] === $userToken) {
        return true;
      }
    }
    return false;
  }

  static function getLoggedInUser() {
    //call this after chekLogin for better perfomance
    if(isset($_SESSION['amUberUserId']) && isset($_SESSION['amUberUserToken'])) {
      $userId = htmlspecialchars($_SESSION['amUberUserId']);
      $userToken = $_SESSION['amUberUserToken'];
      $userData = getUserData($userId);
      if($userData['token'] === $userToken) {
        return new self($userId);
      }
    }

    return null;
  }

}


?>
