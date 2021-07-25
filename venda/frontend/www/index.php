<?php include("cima.php") ?>

<script>
	var URL_API_ACL = '<?= getenv("URL_API_ACL") ?>'
</script>

<script src="scripts/controllers/IndexCtrl.js"></script>


<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper" ng-controller="IndexCtrl">
	<!-- Content Header (Page header) -->
	<section class="content-header">
		<h1>
			-
		</h1>
		<ol class="breadcrumb">
			<li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
		</ol>
	</section>

	<!-- Main content -->
	<section class="content">

		<div class="box box-primary">
			<div class="box-header with-border">
				<h3 class="box-title">DASHBOARD VENDA</h3>

				<table id="example2" class="table table-bordered table-hover" style="margin-top:50px; margin-bottom: 50px">
					<thead>
						<tr>
							<th>Serviço</th>
							<th>URL</th>
							<th class="text-center">Status</th>
						</tr>
					</thead>
					<tbody>
						<tr ng-repeat="servico in listaServicos">
							<td>{{servico.servico}}</td>
							<td><a href="{{servico.url}}" target="_blank">{{servico.url}}</a></td>
							<td class="text-center">
								<span class="label label-success" ng-if="servico.status == true">Ativo</span>
								<span class="label label-danger" ng-if="servico.status == false">Inativo</span>

								<img src="dist/img/tenor.gif" ng-if="servico.status == null">

							</td>
						</tr>
					</tbody>
				</table>

			</div>

		</div>


	</section>
	<!-- /.content -->
</div>





<?php include("baixo.php") ?>