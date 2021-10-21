<?php

require '../../vendor/autoload.php';
include("../../function.php");



$id_pedido = $_GET['id_pedido'];
$token = $_GET['token'];

$url = getenv("URL_API_INTERNAL");

$url = $url . "pedido/" . $id_pedido;

$headers = array("Content-Type: application/json", "Authorization: Bearer $token");

$json = sendGET($url, $headers);

// echo "<pre>";
// print_r($json->itens);



$mpdf = new \Mpdf\Mpdf();




$html = "
<style>
	.table-cliente {
		border: 1px solid black;
		border-collapse: collapse;
		width: 100%;
		font-size:11px;
		font-family: Verdana;
	}

	.table-item {
		border: 1px solid black;
		border-collapse: collapse;
		width: 100%;
		font-size:11px;
		font-family: Verdana;
	}

	.table-item td {
		border: 1px solid black;
		border-collapse: collapse;
	}

	.table-item tr {
		text-align: center;
	}

	* {
		font-size:11px;
		font-family: Verdana;
	}

</style>

<table style='width:100%'>
	<tr>
		<td style='text-align:center; font-size:11px'>
			MONTE SINAI COMERCIO E REPRESENTAÇÕES LTDA
		</td>
	</tr>
</table>

<br><br>

<table class='table-cliente'>
	<tr>
		<td style='width:150px'> Pedido: </td>
		<td> $json->id </td>
	</tr>
	<tr>
		<td> Cliente: </td>
		<td> ".$json->cliente->nome_razao." </td>
	</tr>
	<tr>
		<td> Comprador: </td>
		<td> ".$json->cliente->comprador." </td>
	</tr>
	<tr>
		<td> Endereço: </td>
		<td> ".$json->cliente->endereco." </td>
	</tr>
	<tr>
		<td> Bairro: </td>
		<td> ".$json->cliente->bairro." </td>
	</tr>
	<tr>
		<td> Cidade: </td>
		<td> " . $json->cliente->cidade->descricao. " </td>
	</tr>
	<tr>
		<td> CNPJ/CPF: </td>
		<td> " . $json->cliente->cnpj." </td>
	</tr>
	<tr>
		<td> Telefones: </td>
		<td> ".$json->cliente->tel1." / ".$json->cliente->tel2." / ".$json->cliente->fax. " </td>
	</tr>

</table>

<br><br>

<table class='table-item'>

	<tr style='background-color: #bbb'>
		<td> <b> Código </td>
		<td> <b> Descrição </td>
		<td> <b> Quantidade </td>
		<td> <b> Valor Unitário </td>
		<td> <b> Valor Total </td>
	</tr>
";

	$total = 0;
	foreach ($json->itens as $item) {
		$total_item = $item->quantidade * $item->valor_unitario;
		$total += $total_item;
		
		$html .= "
		<tr>
			<td> $item->id_produto </td>
			<td> $item->descricao </td>
			<td> $item->quantidade </td>
			<td> ".formataValor($item->valor_unitario)." </td>
			<td> ".formataValor($total_item)." </td>
		</tr>
		";
	}

	$html .= "
	<tr style='background-color: #bbb'>
		<td> </td>
		<td> </td>
		<td> </td>
		<td> <b> Total </td>
		<td> <b> ".formataValor($total)." </td>
	</tr>




</table>

";


$mpdf->WriteHTML($html);
$mpdf->Output();