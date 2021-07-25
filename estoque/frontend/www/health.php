<?php
header('Content-Type: application/json');

$json['app'] = "ms-estoque-frontend";
$json['version'] = 1.0;
$json['status'] = true;
$json['hostname'] = gethostname();

echo json_encode($json);
?>
