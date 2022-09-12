<?php

require_once dirname(__FILE__).'/../conn.php';
require_once dirname(__FILE__).'/../functions.php';

/**
 * All user functionality
 */
class Notification {
  public $id;
  function __construct($id){
    $this->id = $id;
  }

  public function getData() {
    return getNotificationData($this->id);
  }

  static function send($userId, $msg) {
    global $conn;
    $user = new User($userId);
    $sql = $conn->prepare("INSERT INTO notifications (msg, userId, dateSent) VALUES ( ?, ?, ? )");
    $time = time();
    $sql->bind_param('sss', $msg, $userId, $time);
    if($sql->execute()) {
      $user->notify($msg);
    }
  }

}


?>
