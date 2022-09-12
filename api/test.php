<?php

require_once dirname(__FILE__).'/conn.php';
require_once dirname(__FILE__).'/functions.php';

User::login(
  'peterndomano@gmail.com',
  '',
  'ohhmama@222',
  ''
);

$user = User::getLoggedInUser();
//print_r($user->getShowData());
?>
