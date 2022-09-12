<?php

$dbHost = 'localhost';
$dbName = 'igolyn';
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
