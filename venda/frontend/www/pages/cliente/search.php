<div class="col-md-12" style="margin-bottom:20px">
	<form role="form">



		<div class="form-group">

			<div class="col-sm-6">
				<label>Razão Social</label>
				<input class="form-control" placeholder="Digite Razão Social" ng-model="busca.nome_razao">
			</div>

			<div class="col-sm-6">
				<label>CNPJ</label>
				<input class="form-control" placeholder="Digite o CNPJ" ng-model="busca.cnpj">
			</div>

			<div class="col-sm-6" style="margin-top:20px">
				<label>Cidade</label>
				<select class="form-control" ng-options="item.id as item.descricao for item in listaCidades" ng-model="busca.cidade">
					<option value=""> - Selecione - </option>
				</select>
			</div>

			<div class="col-sm-6" style="margin-top:20px">
				<label>Região</label>
				<select class="form-control" ng-options="item.id as item.descricao for item in listaRegiao" ng-model="busca.id_regiao">
					<option value=""> - Selecione - </option>
				</select>
			</div>

		</div>

		<div style="clear:both; margin-bottom:20px"></div>

		<div class="box-footer">
			<button type="submit" class="btn btn-primary" ng-click="buscar()">Buscar</button>
			<button class="btn btn-success" ng-click="preparaCadastrar()"> <i class="fa fa-plus"></i> Novo </button>
		</div>
	</form>

</div>


<div class="box-body table-responsive">
	<table id="example2" class="table table-bordered table-hover">
		<thead>
			<tr>
				<th>ID</th>
				<th>Nome Razão</th>
				<th class="text-center">CNPJ</th>
				<th class="text-center">Cidade</th>
				<th width="15%"></th>
			</tr>
		</thead>
		<tbody>
			<tr ng-repeat="item in listaClientes">
				<td>{{item.id}}</td>
				<td>{{item.nome_razao}}</td>
				<td class="text-center">{{item.cnpj}}</td>
				<td class="text-center">{{item.descricao_cidade}}</td>
				<td class="text-center">
					<button type="button" title="Editar" style="margin-right:5px" class="btn btn-sm" ng-click="preparaAlterar(item)"><i class="fa fa-edit"></i></button>
					<button type="button" title="Excluir" style="margin-right:5px" class="btn btn-sm" ng-click="excluir(item)"><i class="fa fa-times"></i></button>
				</td>
			</tr>
		</tbody>
	</table>


	<?php include("../paginacao.php") ?>

</div>