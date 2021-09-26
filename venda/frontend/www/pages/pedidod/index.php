<?php include("../../cima.php") ?>
<script src="pages/pedidod/PedidoCtrl.js?v=<?= time() ?>"></script>
<script>
	var TIPO_PEDIDO = 2;
</script>



<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper" ng-controller="PedidoCtrl">
	<!-- Content Header (Page header) -->
	<section class="content-header">
		<h1>
			-
		</h1>
		<ol class="breadcrumb">
			<li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
			<li class="active">Pedido</li>
		</ol>
	</section>

	<!-- Main content -->
	<section class="content">

		<?php include("cliente.php") ?>

		<?php include("search.php") ?>

		<?php include("form.php") ?>

		<?php include("pedidoItem.php") ?>

		<?php include("../pedido/baixa.php") ?>


		<?php include("../pedido/modals.php") ?>

	</section>
	<!-- /.content -->
</div>


<?php include("../../baixo.php") ?>