<div class="col-md-6" style="margin-bottom:20px">
	<form role="form">
		<div class="box-body">
			<div class="form-group">
				<label>Razão Social</label>
				<input class="form-control" placeholder="Digite Razão Social" ng-model="busca.nome_razao">
			</div>
			<div class="form-group">
				<label>CNPJ</label>
				<input class="form-control" placeholder="Digite o CNPJ" ng-model="busca.cnpj">
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
				<th>ID</th>
				<th>Razão Social</th>
				<th>CNPJ</th>
				<th width="10%"></th>
			</tr>
		</thead>
		<tbody>
			<tr ng-repeat="item in listaFornecedores">
				<td>{{item.id}}</td>
				<td>{{item.nome_razao}}</td>
				<td>{{item.cnpj}}</td>
				<td class="text-center">
					<button type="button" title="Editar" style="margin-right:5px" class="btn btn-sm" ng-click="preparaAlterar(item)"><i class="fa fa-edit"></i></button>
					<button type="button" title="Excluir" style="margin-right:5px" class="btn btn-sm" ng-click="excluir(item)"><i class="fa fa-times"></i></button>
				</td>
			</tr>
		</tbody>
	</table>


	<?php include("../paginacao.php") ?>

</div>