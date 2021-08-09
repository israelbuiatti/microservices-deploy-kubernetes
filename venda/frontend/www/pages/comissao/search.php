<?php include("print.php") ?>

<div class="no-print">
	<div class="col-md-12" style="margin-bottom:20px">
		<form role="form">
			<div class="box-body">

				<div class="col-sm-3">
					<label>Fornecedor</label>
					<select class="form-control" ng-options="item.id as item.nome_razao for item in listaFornecedor" ng-model="pedido.id_fornecedor">
						<option value=""> - Selecione - </option>
					</select>
				</div>

				<div class="col-sm-3">
					<label>Vendedor</label>
					<select class="form-control" ng-options="item.id as item.nome for item in listaVendedor" ng-model="pedido.id_vendedor">
						<option value=""> - Selecione - </option>
					</select>
				</div>

				<div class="col-sm-2" style="width: 130px;">
					<label>Data</label>
					<input ng-model="pedido.data1" id="data1" class="form-control date" style="width:100px" ng-blur="changeData1()" />
				</div>

				<div class="col-sm-1" style="margin: 0;padding: 0;width: 10px;">
					<label style="color:#fff">-</label>
					<div style="margin-top:14px">a</div>
				</div>

				<div class="col-sm-2" style="width: 130px;">
					<label style="color:#fff">- </label>
					<input ng-model="pedido.data2" id="data2" class="form-control date" style="width:100px" ng-blur="changeData2()" />
				</div>
				<div class="col-sm-1" style="margin-top: 25px;">
					<button type="submit" class="btn btn-primary" ng-click="buscar()">Buscar</button>
				</div>
			</div>

		</form>

	</div>


	<div class="box-body">

		<div style="clear:both"></div>

		<p ng-if="comissao" class="text-muted well well-sm no-shadow" style="margin-top: 10px;">
			<b>Comissão:</b> {{comissao}}%
		</p>

		<table id="example2" class="table table-bordered table-hover">
			<thead>
				<tr>
					<th class="text-center">Pedido</th>
					<th class="text-center">Data</th>
					<th>Cliente</th>
					<th class="text-center">Cidade</th>
					<th class="text-center">Valor Pedido</th>
					<th class="text-center">Valor Baixado</th>
					<th class="text-center">Comissão</th>
					<th class="text-center">%</th>
				</tr>
			</thead>
			<tbody>
				<tr ng-repeat="item in listaPedido">
					<td width="100px" class="text-center">{{item.id}}</td>
					<td width="150px" class="text-center">{{item.data}}</td>
					<td>{{item.nome_razao}}</td>
					<td class="text-center">{{item.descricao_cidade}}</td>
					<td class="text-center" width="200px">{{item.valor | currency:'R$ '}}</td>
					<td class="text-center" width="200px">{{item.valor_baixado | currency:'R$ '}}</td>
					<td class="text-center" width="200px">{{item.comissao | currency:'R$ '}}</td>
					<td class="text-center" width="200px">{{item.porcentagem | currency:''}}%</td>
				</tr>
				<tr>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td class="text-center"><b>{{total.valor | currency:'R$ '}}</td>
					<td class="text-center"><b>{{total.valor_baixado | currency:'R$ '}}</td>
					<td class="text-center"><b>{{total.comissao | currency:'R$ '}}</td>
					<td></td>
				</tr>
			</tbody>
		</table>

	</div>
</div>