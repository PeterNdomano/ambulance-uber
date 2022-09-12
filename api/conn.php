<?php

$dbHost = 'localhost';
$dbName = 'am-uber';
$dbUser = 'root';
$dbPwd = '';

$conn = mysqli_connect(
  $dbHost,
  $dbUser,
  $dbPwd,
  $dbName
);

if(!$conn) {
  die('Could not connect to the database server');
}

?>
