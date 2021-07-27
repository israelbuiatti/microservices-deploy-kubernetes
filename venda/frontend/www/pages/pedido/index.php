<?php include("../../cima.php") ?>
<script src="pages/pedido/PedidoCtrl.js"></script>


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

		<div class="box box-primary">
			<div class="box-header with-border">
				<h3 class="box-title">Pedido</h3>
				<button class="btn btn-success" ng-click="preparaCadastrar()" style="float:right"> <i class="fa fa-plus"></i> Novo </button>
			</div>

			<div ng-show="state == 'search'">
				<?php include("search.php") ?>
			</div>

			<div ng-show="state == 'insert' || state == 'update'">
				<?php include("form.php") ?>
			</div>

		</div>

		<?php include("pedidoItem.php") ?>

		<?php include("baixa.php") ?>


		<script>
			$('#myModal').on('shown.bs.modal', function() {
				$('#myInput').focus()
			})
		</script>

		<?php include("modals.php") ?>

	</section>
	<!-- /.content -->
</div>


<?php include("../../baixo.php") ?>