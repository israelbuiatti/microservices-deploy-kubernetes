<div class="col-md-6" style="margin-bottom:20px">
	<form role="form">
		<div class="box-body">
			<div class="form-group">
				<label>Nome</label>
				<input class="form-control" placeholder="Digite o Nome" ng-model="busca.nome">
			</div>
		</div>

		<div class="box-footer">
			<button type="submit" class="btn btn-primary" ng-click="buscar()">Buscar</button>
			<button class="btn btn-success" ng-click="preparaCadastrar()"> <i class="fa fa-plus"></i> Novo </button>
		</div>
	</form>

</div>


<div class="box-body">
	<table id="example2" class="table table-bordered table-hover">
		<thead>
			<tr>
				<th class="text-center">ID</th>
				<th class="text-center">Data</th>
				<th class="text-center">Motorista</th>
				<th class="text-center">Total Pedidos</th>
				<th class="text-center">Total Valor</th>
				<th width="10%"></th>
			</tr>
		</thead>
		<tbody>
			<tr ng-repeat="item in lista">
				<td class="text-center">{{item.id}}</td>
				<td class="text-center">{{item.data}}</td>
				<td>{{item.motorista}}</td>
				<td class="text-center">{{item.total_pedidos}}</td>
				<td class="text-center">{{item.total_valor}}</td>
				<td class="text-center">
					<button type="button" title="Editar" style="margin-right:5px" class="btn btn-sm" ng-click="preparaAlterar(item)"><i class="fa fa-edit"></i></button>
					<button type="button" title="Excluir" style="margin-right:5px" class="btn btn-sm" ng-click="excluir(item)"><i class="fa fa-times"></i></button>
				</td>
			</tr>
		</tbody>
	</table>


	<?php include("../paginacao.php") ?>

</div>