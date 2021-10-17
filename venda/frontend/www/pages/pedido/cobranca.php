<div class="box box-info" ng-show="state == 'update' && userAccess.admin">
	<div class="box-header with-border">
		<h3 class="box-title">Cobrança</h3>
	</div>

	<div class="box-body">

		<div class="form-group">

			<div class="col-sm-2">
				<label>Data</label>
				<input ng-model="pedidoCobrancaForm.data" class="form-control date" id='data_cobranca' style="width:100px" />
			</div>

			<div class="col-sm-2">
				<label>Valor</label>
				<input class="form-control moeda" type="text" ng-model="pedidoCobrancaForm.valor" style="width:100px">
			</div>

			<div class="col-sm-2">
				<label>Observação</label>
				<input class="form-control" ng-model="pedidoCobrancaForm.obs" type="text" style="width:100px">
			</div>

			<div class="col-sm-2" style="height: 60px;margin-top: 25px;">
				<button type="submit" class="btn btn-primary" ng-click="salvarCobranca()">Salvar</button>
			</div>

		</div>


		<table class="table">
			<tr>
				<th class="text-center"> Data </th>
				<th class="text-center"> Valor </th>
				<th class="text-center"> Observação </th>
				<th class="text-center"> </th>
			</tr>
			<tr ng-repeat="item in listaPedidoCobranca">
				<td class="text-center"> {{item.data}} </td>
				<td class="text-center"> {{item.valor | currency:'R$ '}} </td>
				<td class="text-center"> {{item.obs}} </td>
				<td>
					<button type="button" class="btn btn-sm" ng-click="excluirCobranca(item)" title="Excluir Cobrança"><i class="fa fa-times"></i></button>
				</td>
			</tr>
		</table>



	</div>

</div>