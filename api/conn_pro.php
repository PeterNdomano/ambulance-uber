<?php

$dbHost = 'localhost';
$dbName = 'u148557464_igolyn';
$dbUser = 'u148557464_igolyn';
$dbPwd = 'Igolyn@222';

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
