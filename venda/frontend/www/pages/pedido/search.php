<div class="col-md-6" style="margin-bottom:20px">
	<form role="form">
		<div class="box-body">
			<div class="form-group">
				<label>Pedido</label>
				<input class="form-control" placeholder="Digite o Nº do Pedido" ng-model="busca.id">
			</div>
			<div class="form-group">
				<label>Cliente</label>
				<input class="form-control" placeholder="Digite a Razão Social" ng-model="busca.nome_razao">
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
				<th class="text-center">Pedido</th>
				<th class="text-center">Data</th>
				<th>Cliente</th>
				<th class="text-center">Cidade</th>
				<th class="text-center">Valor</th>
				<th width="15%"></th>
			</tr>
		</thead>
		<tbody>
			<tr ng-repeat="item in listaPedido">
				<td width="100px" class="text-center">{{item.id}}</td>
				<td width="150px" class="text-center">{{item.data}}</td>
				<td>{{item.nome_razao}}</td>
				<td class="text-center">{{item.descricao_cidade}}</td>
				<td class="text-center" width="200px">{{item.valor | currency:'R$ '}}</td>
				<td class="text-center" width="100px">
					<button type="button" title="Editar" style="margin-right:5px" class="btn btn-sm" ng-click="preparaAlterar(item)"><i class="fa fa-edit"></i></button>
					<button type="button" title="Excluir" style="margin-right:5px" class="btn btn-sm" ng-click="excluir(item)"><i class="fa fa-times"></i></button>
					<button type="button" title="Imprimir" style="margin-right:5px" class="btn btn-sm" ng-click="imprimir(item)"><i class="fa fa-print"></i></button>
				</td>
			</tr>
		</tbody>
	</table>


	<?php include("../paginacao.php") ?>

</div>