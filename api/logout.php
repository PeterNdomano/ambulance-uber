<?php

require_once dirname(__FILE__).'/conn.php';
require_once dirname(__FILE__).'/functions.php';

startSession();
session_destroy();

echo json_encode(array(
  'status' => 1,
  'msg' => 'Log out',
));

?>
