<?php

require '../../vendor/autoload.php';
include("../../function.php");



$id_manifesto = $_GET['id_manifesto'];
$token = $_GET['token'];

$token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1OTBiN2NkOS0yYTQwLTRmOTQtYjJjMS03MTJmNzdlMDQzOGMiLCJleHAiOjE2MzUyMTgwMDUsImlkX3ZlbmRlZG9yIjoibnVsbCIsInJvbGUiOlsiUk9MRV9BRE1JTiJdLCJ1c2VybmFtZSI6ImlzcmFlbCJ9.T4YXgbrqUTz4ubkX8luibcJRV64hoeZicFkJAI00ceyDtl9fTQvnPlPKHWGAFlt9ooZTfQTVX0bzmEY3FUDNLw";
$id_manifesto = 26;

$url = getenv("URL_API_INTERNAL");

$body = '{ "order_by": "cidade" }';

$headers = array("Content-Type: application/json", "Authorization: Bearer $token");

$json = sendPOST($url . "pedido/buscaPedidoManifesto/" . $id_manifesto, $body, $headers);

$manifesto = sendGET($url . "manifesto/" . $id_manifesto, $headers);
$date = new DateTime($manifesto->data);
$data_manifesto = $date->format('d/m/Y');


// echo "<pre>";
// print_r($manifesto);
// exit;



$total_geral = 0;
$quantidade_geral = 0;
foreach ($json as $pedido) {

	$quantidade_total = 0;

	if (!empty($pedido->itens)) {
		foreach ($pedido->itens as $item) {
			$quantidade_total += $item->quantidade;
		}
	}

	$quantidade_geral += $quantidade_total;
	$total_geral += $pedido->valor;

}




$mpdf = new Mpdf\Mpdf([
	'mode' => 'utf-8',
	'format' => 'A4-L',
	'orientation' => 'L'
]);


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
			MONTE SINAI COMERCIO E REPRESENTAÇÕES LTDA <br><br> MANIFESTO DE CARGA
		</td>
	</tr>
</table>

<br><br>

<table class='table-cliente'>
	<tr>
		<td style='width:150px'> Número: </td>
		<td> $manifesto->id </td>
	</tr>
	<tr>
		<td> Motorista: </td>
		<td> " . $manifesto->motorista . " </td>
	</tr>
	<tr>
		<td> Data: </td>
		<td> " . $data_manifesto . " </td>
	</tr>
	<tr>
		<td> Total Pedidos: </td>
		<td> " .count($json) . " </td>
	</tr>
	<tr>
		<td> Valor Total: </td>
		<td> " . formataValor($total_geral) . " </td>
	</tr>
	<tr>
		<td> Quantidade Total Itens: </td>
		<td> " . $quantidade_geral . " </td>
	</tr>
</table>

<br><br>

<table class='table-item'>

	<tr style='background-color: #bbb'>
		<td> <b> Pedido </td>
		<td> <b> Cliente </td>
		<td> <b> Cidade </td>
		<td> <b> Produtos </td>
		<td> <b> Vendedor </td>
		<td> <b> Qtd Total </td>
		<td> <b> Valor Total </td>
	</tr>
";

$total_geral = 0;
$quantidade_geral = 0;
foreach ($json as $pedido) {

	$quantidade_total = 0;
	$itens = "";

	if (!empty($pedido->itens)) {
		foreach ($pedido->itens as $item) {
			$quantidade_total += $item->quantidade;
			$item_valor = $item->quantidade * $item->valor_unitario;
			$itens .= "$item->descricao | $item->quantidade | ". formataValor($item_valor)." <br>";
		}
	}

	$quantidade_geral += $quantidade_total;
	$total_geral += $pedido->valor;

	$date = new DateTime($pedido->data);
	$data = $date->format('d/m/Y');
	

	$html .= "
		<tr>
			<td style='text-align:center'> $pedido->id </td>
			<td> $pedido->nome_razao <br><br> $pedido->endereco <br> $pedido->bairro <br> $pedido->tel1 / $pedido->tel2 / $pedido->fax </td>
			<td style='text-align:center'> $pedido->descricao_cidade </td>
			<td> $itens </td>
			<td> $pedido->vendedor_nome </td>
			<td style='text-align:center'> $quantidade_total </td>
			<td style='text-align:center'> " . formataValor($pedido->valor) . " </td>
		</tr>
		";
}

$html .= "
	<tr style='background-color: #bbb'>
		<td> </td>
		<td> </td>
		<td> </td>
		<td> </td>
		<td style='text-align:center'> <b> Total </td>
		<td style='text-align:center'> <b> $quantidade_geral </td>
		<td style='text-align:center'> <b> " . formataValor($total_geral) . " </td>
	</tr>




</table>

";


$mpdf->WriteHTML($html);
$mpdf->Output();
