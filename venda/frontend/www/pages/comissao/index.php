<?php include("../../cima.php") ?>
<script src="pages/comissao/ComissaoCtrl.js?v=<?= time() ?>"></script>


<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper" ng-controller="ComissaoCtrl">
	<!-- Content Header (Page header) -->
	<section class="content-header">
		<h1>
			-
		</h1>
		<ol class="breadcrumb">
			<li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
			<li class="active">Comissão</li>
		</ol>
	</section>

	<!-- Main content -->
	<section class="content">

		<div class="box box-primary">
			<div class="box-header with-border">
				<h3 class="box-title">Comissão</h3>
			</div>

			<div ng-show="state == 'search'">
				<?php include("search.php") ?>
			</div>

		</div>


	</section>
	<!-- /.content -->
</div>


<?php include("../../baixo.php") ?>