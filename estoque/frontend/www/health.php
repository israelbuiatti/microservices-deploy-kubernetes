<?php
header('Content-Type: application/json');
header("HTTP/1.1 200 OK");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");


$json['app'] = "ms-estoque-frontend";
$json['version'] = 1.0;
$json['status'] = true;
$json['hostname'] = gethostname();

echo json_encode($json);
?>
