<div class="col-md-12" style="margin-bottom:20px">
	<form role="form">

		<div class="form-group">

			<div class="col-sm-2">
				<label>Data</label>
				<input ng-model="manifesto.data" id="data" class="form-control date" style="width:100px" />
			</div>

			<div class="col-sm-6">
				<label>Motorista</label>
				<input class="form-control" placeholder="Digite o Motorista" ng-model="manifesto.motorista">
			</div>

		</div>

	</form>

</div>



<form class="form-horizontal">
	<div class="box-body">

		<div style="margin: 10px 0px 20px 0px">Adicionados:</div>
		<table id="example2" class="table table-bordered table-hover">
			<thead>
				<tr>
					<th class="text-center"></th>
					<th class="text-center">Pedido</th>
					<th class="text-center">Data</th>
					<th class="text-center">Cliente</th>
					<th class="text-center">Cidade</th>
					<th class="text-center">Produtos</th>
					<th class="text-center">Vendedor</th>
					<th class="text-center">Qtde Total</th>
					<th class="text-center">Valor Total</th>
				</tr>
			</thead>
			<tbody>
				<tr ng-repeat="item in selecionados">
					<td class="text-center">
						<button type="submit" class="btn btn-danger" ng-click="removerItem(item)" style="font-size:11px">Remover</button>
					</td>
					<td class="text-center">{{item.id}}</td>
					<td class="text-center">{{item.data}}</td>
					<td>{{item.nome_razao}}</td>
					<td class="text-center">{{item.descricao_cidade}}</td>
					<td>
						<div ng-repeat="itemPedido in item.itens">
							<small>{{itemPedido.descricao}} | Quantidade: {{itemPedido.quantidade}} | Valor: {{itemPedido.quantidade * itemPedido.valor_unitario | currency:''}}</small>
						</div>
					</td>
					<td class="text-center">{{item.vendedor_nome}}</td>
					<td class="text-center">{{item.quantidade_total}}</td>
					<td class="text-center">{{item.valor | currency:'R$ '}}</td>
				</tr>
			</tbody>
		</table>

		<div class="box-footer" style="margin-top:20px; margin-bottom:20px; text-align:center">
			<button ng-if="state == 'insert'" type="submit" class="btn btn-primary" ng-click="cadastrar()">Cadastrar</button>
			<button ng-if="state == 'update'" type="submit" class="btn btn-primary" ng-click="alterar()">Alterar</button>
			<button type="submit" class="btn" ng-click="cancel()">Cancelar</button>
		</div>

		<div style="margin: 10px 0px 20px 0px">Pedidos:</div>
		<table id="example2" class="table table-bordered table-hover">
			<thead>
				<tr>
					<th class="text-center"></th>
					<th class="text-center">Pedido</th>
					<th class="text-center">Data</th>
					<th class="text-center">Cliente</th>
					<th class="text-center">Cidade</th>
					<th class="text-center">Produtos</th>
					<th class="text-center">Vendedor</th>
					<th class="text-center">Qtde Total</th>
					<th class="text-center">Valor Total</th>
				</tr>
			</thead>
			<tbody>
				<tr ng-repeat="item in pedidos">
					<td class="text-center">
						<button type="submit" class="btn btn-success" ng-click="adicionarItem(item)" style="font-size:11px">Adicionar</button>
					</td>
					<td class="text-center">{{item.id}}</td>
					<td class="text-center">{{item.data}}</td>
					<td>{{item.nome_razao}}</td>
					<td class="text-center">{{item.descricao_cidade}}</td>
					<td>
						<div ng-repeat="itemPedido in item.itens">
							<small>{{itemPedido.descricao}} | Quantidade: {{itemPedido.quantidade}} | Valor: {{itemPedido.quantidade * itemPedido.valor_unitario | currency:''}}</small>
						</div>
					</td>
					<td class="text-center">{{item.vendedor_nome}}</td>
					<td class="text-center">{{item.quantidade_total}}</td>
					<td class="text-center">{{item.valor | currency:'R$ '}}</td>
				</tr>
			</tbody>
		</table>

	</div>


</form>