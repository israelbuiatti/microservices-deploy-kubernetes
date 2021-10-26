<div class="box box-primary" ng-show="state == 'search'">
	<div class="box-header with-border">
		<h3 class="box-title">Pedido</h3>
	</div>

	<div class="col-md-12" style="margin-bottom:20px">
		<form role="form">

			<div class="form-group">

				<div class="col-sm-6">
					<label>Pedido</label>
					<input class="form-control" placeholder="Digite o Nº do Pedido" ng-model="busca.id">
				</div>

				<div class="col-sm-6">
					<label>Vendedor</label>
					<select class="form-control" ng-options="item.id as item.nome for item in listaVendedor" ng-model="busca.id_vendedor">
						<option value=""> - Selecione - </option>
					</select>
				</div>

				<div class="col-sm-6" style="margin-top:20px">
					<label>Cliente</label>
					<input class="form-control" placeholder="Digite a Razão Social" ng-model="busca.nome_razao">
				</div>

				<div class="col-sm-6" style="margin-top:20px">
					<label>Cidade</label>
					<select class="form-control" ng-options="item.id as item.descricao for item in listaCidades" ng-model="busca.cidade">
						<option value=""> - Selecione - </option>
					</select>
				</div>

				<!-- -- -->
				<div class="col-sm-2" style="width: 130px; margin-top:20px">
					<label>Data</label>
					<input ng-model="busca.data_inicio" id="data_inicio" class="form-control date" style="width:100px" ng-blur="changeData1()" />
				</div>

				<div class="col-sm-1" style="margin: 0;padding: 0;width: 10px; margin-top:20px">
					<label style="color:#fff">-</label>
					<div style="margin-top:14px">a</div>
				</div>

				<div class="col-sm-2" style="width: 130px; margin-top:20px">
					<label style="color:#fff">- </label>
					<input ng-model="busca.data_fim" id="data_fim" class="form-control date" style="width:100px" ng-blur="changeData2()" />
				</div>
				<!-- -- -->

			</div>

			<div style="clear:both"></div>

			<div class="box-footer" style="margin-top:20px">
				<button type="submit" class="btn btn-primary" ng-click="buscar()">Buscar</button>
				<button class="btn btn-success" ng-click="preparaCadastrar()"> <i class="fa fa-plus"></i> Novo </button>
			</div>
		</form>

	</div>


	<div class="box-body table-responsive">
		<table id="example2" class="table table-bordered table-hover">
			<thead>
				<tr>
					<th class="text-center">Pedido</th>
					<th class="text-center">Data</th>
					<th>Cliente</th>
					<th class="text-center">Cidade</th>
					<th class="text-center">Vendedor</th>
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
					<td class="text-center">{{item.vendedor_nome}}</td>
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

</div>