<?php include("../../cima.php") ?>
<script src="/pages/fornecedor/FornecedorCtrl.js"></script>


<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper" ng-controller="FornecedorCtrl">
	<!-- Content Header (Page header) -->
	<section class="content-header">
		<h1>
			-
		</h1>
		<ol class="breadcrumb">
			<li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
			<li class="active">Fornecedor</li>
		</ol>
	</section>

	<!-- Main content -->
	<section class="content">

		<div class="box box-primary">
			<div class="box-header with-border">
				<h3 class="box-title">Fornecedor</h3>
				<button class="btn btn-success" ng-click="preparaCadastrar()" style="float:right"> <i class="fa fa-plus"></i> Novo </button>
			</div>

			<div ng-show="state == 'search'">
				<?php include("search.php") ?>
			</div>

			<div ng-show="state == 'insert' || state == 'update'">
				<?php include("form.php") ?>
			</div>


		</div>

	</section>

</div>


<?php include("../../baixo.php") ?>