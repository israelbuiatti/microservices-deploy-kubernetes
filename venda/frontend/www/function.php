<?php

function sendPost($url, $body, $headers) {

    //$headers = array("Content-Type: application/json", "Authorization: OAuth 2.0 token here");
    $headers[] = "Content-Type: application/json";

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
    $result = curl_exec($ch);
    return json_decode($result);

}

?>
