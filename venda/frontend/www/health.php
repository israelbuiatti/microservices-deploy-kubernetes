<?php
header('Content-Type: application/json');
header("HTTP/1.1 200 OK");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");

include("./version.php");

echo json_encode($json_version);
?>
