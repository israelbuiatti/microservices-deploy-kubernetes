<div class="print">
	<div class="col-md-12" style="margin-bottom:20px">

		<table>
			<tr>
				<td> <b>Fornecedor </td>
				<td> <b>Vendedor </td>
				<td> <b>Período </td>
			</tr>
			<tr>
				<td width="40%">
					<select class="form-control" ng-options="item.id as item.nome_razao for item in listaFornecedor" ng-model="pedido.id_fornecedor">
						<option value=""> - Selecione - </option>
					</select>
				</td>
				<td width="40%">
					<select class="form-control" ng-options="item.id as item.nome for item in listaVendedor" ng-model="pedido.id_vendedor">
						<option value=""> - Selecione - </option>
					</select>
				</td>
				<td width="20%">
					{{pedido.data1}} a {{pedido.data2}}
				</td>
			</tr>
		</table>

	</div>


	<div class="box-body">

		<p ng-if="comissao" class="text-muted well well-sm no-shadow">
			<b>Comissão:</b> {{comissao}}%
		</p>

		<table id="example2" class="table table-bordered table-hover">
			<thead>
				<tr>
					<th class="text-center">Pedido</th>
					<th class="text-center">Data</th>
					<th>Cliente</th>
					<th class="text-center">Valor</th>
					<th class="text-center">Comissão</th>
				</tr>
			</thead>
			<tbody>
				<tr ng-repeat="item in listaPedido">
					<td class="text-center">{{item.id}}</td>
					<td class="text-center">{{item.data}}</td>
					<td>{{item.nome_razao}}</td>
					<td class="text-center">{{item.valor_baixado | currency:'R$ '}}</td>
					<td class="text-center">{{item.comissao | currency:'R$ '}}</td>
				</tr>
				<tr>
					<td></td>
					<td></td>
					<td></td>
					<td class="text-center"><b>{{total.valor_baixado | currency:'R$ '}}</td>
					<td class="text-center"><b>{{total.comissao | currency:'R$ '}}</td>
				</tr>
			</tbody>
		</table>

	</div>
</div>