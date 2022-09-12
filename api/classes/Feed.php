<?php

require_once dirname(__FILE__).'/../conn.php';
require_once dirname(__FILE__).'/../functions.php';

/**
 * All Feed functionalities
 */
class Feed {
  public static $batchSize = 20;

  public static function fetch( $batchIndex, $searchTerm = "", $filter = "" ) {
    global $conn;
    $sql = "";
    $data = array(
      'status' => 1,
      'msg' => 'No items were found',
      "maxBatchIndex" => null,
      "data" => null,
      "nextBatchIndex" => null,
      "searchTerm" => $searchTerm,
      "filter" => $filter,
    );

    //build query
    if(strlen(trim($searchTerm)) > 0) {
      $sql = $conn->prepare("SELECT * FROM ambulances
          WHERE (hospitals LIKE ? OR routes LIKE ? ) AND ( status != 2)
          ORDER BY id DESC
        ");
      $searchTerm = '%'.$searchTerm.'%';
      $sql->bind_param('ss', $searchTerm, $searchTerm);
    }
    else if(strlen(trim($filter)) > 0 && $filter !== 'all') {
      $sql = $conn->prepare("SELECT * FROM ambulances
          WHERE ( hospitals LIKE ? ) AND ( status != 2)
          ORDER BY id DESC
        ");
      $filter = '%'.$filter.'%';
      $sql->bind_param('s', $filter);
    }
    else {
      $sql = $conn->prepare("SELECT * FROM ambulances
          WHERE ( status != 2)
          ORDER BY id DESC
        ");
    }

    //execute
    $sql->execute();
    $result = $sql->get_result();

    if(mysqli_num_rows($result) > 0) {
      $rows = [];
      while( $row = mysqli_fetch_assoc($result) ){
        array_push($rows, $row);
      }

      $data = batchfy($rows, self::$batchSize, $batchIndex);
      $data['status'] = 1;
      $data['msg'] = 'Feed';
      $data['filter'] = $filter;
      $data['searchTerm'] = $searchTerm;
    }

    return $data;
  }
}


?>
