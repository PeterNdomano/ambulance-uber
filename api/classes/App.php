<?php

require_once dirname(__FILE__).'/../conn.php';
require_once dirname(__FILE__).'/../functions.php';

/**
 * All user functionality
 */
class App {
  function __construct(){
    $this->data = getAppConfig();
  }

}


?>
