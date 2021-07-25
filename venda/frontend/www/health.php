<?php
header('Content-Type: application/json');
header("HTTP/1.1 200 OK");

$json['app'] = "ms-venda-frontend";
$json['version'] = 1.0;
$json['status'] = true;
$json['hostname'] = gethostname();

echo json_encode($json);
?>
