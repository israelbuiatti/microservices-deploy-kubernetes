<div class="box box-primary" ng-show="state == 'update'">
	<div class="box-header with-border">
		<h3 class="box-title">Itens do Pedido</h3>
	</div>







	<form class="form-horizontal">
		<div class="box-body">

			<div class="form-group">

				<div class="col-sm-2">
					<label>Produto</label>
					<input type="text" class="form-control" value="{{pItem.descricao}}" disabled>
					<button data-toggle="modal" data-target="#modalProduto" style="height:34px" class="btn btn-primary" ng-click="abrirModalProduto()">Pesquisar</button>
				</div>

				<div class="col-sm-2">
					<label>Quantidade</label>
					<input class="form-control" ng-model="pItem.quantidade" type="text">
				</div>

				<div class="col-sm-2">
					<label>Preço</label>
					<input class="form-control moeda" ng-model="pItem.valor_unitario" type="text">
				</div>

			</div>

			<div style="text-align:center">
				<button type="submit" class="btn btn-primary" ng-click="adicionarItem()">Adicionar</button>
			</div>

		</div>
	</form>


	<table class="table">
		<tr>
			<th> Produto </th>
			<th class="text-center"> Quantidade </th>
			<th class="text-center"> Preço </th>
			<th class="text-center"> Total </th>
			<th class="text-center"> </th>
		</tr>
		<tr ng-repeat="item in itens">
			<td> {{item.descricao}} </td>
			<td class="text-center"> {{item.quantidade}} </td>
			<td class="text-center"> {{item.valor_unitario | currency:' '}} </td>
			<td class="text-center"> {{item.quantidade*item.valor_unitario | currency:''}} </td>
			<td>
				<button type="button" class="btn btn-sm" ng-click="excluirItem(item)"><i class="fa fa-times"></i></button>
			</td>
		</tr>

		<tr>
			<td></td>
			<td></td>
			<td class="text-right"><b>Total</td>
			<td class="text-center"><b>{{valor_total | currency:''}}</td>
			<td></td>
		</tr>

	</table>




	<!-- <form class="form-horizontal">
		<div class="box-body">


			<table class="table">
				<tr>
					<th> Produto </th>
					<th class="text-center"> Quantidade </th>
					<th class="text-center"> Preço </th>
					<th class="text-center"> Total </th>
					<th class="text-center"> </th>
				</tr>
				<tr>
					<td width="400px">
						<div>
							<input type="text" class="form-control" style="width:300px; float:left" value="{{pItem.descricao}}" disabled>
							<button data-toggle="modal" data-target="#modalProduto" style="float:left; height:34px" class="btn btn-primary" ng-click="abrirModalProduto()">Pesquisar</button>
							<div style="clear:both"></div>
						</div>
					</td>
					<td align="center"> <input class="form-control" ng-model="pItem.quantidade" type="text" style="width:100px"> </td>
					<td align="center"> <input class="form-control moeda" ng-model="pItem.valor_unitario" type="text" style="width:100px"> </td>
					<td class="text-center"> <button type="submit" class="btn btn-primary" ng-click="adicionarItem()">Adicionar</button> </td>
				</tr>
				<tr ng-repeat="item in itens">
					<td> {{item.descricao}} </td>
					<td class="text-center"> {{item.quantidade}} </td>
					<td class="text-center"> {{item.valor_unitario | currency:'R$ '}} </td>
					<td class="text-center"> {{item.quantidade*item.valor_unitario | currency:'R$'}} </td>
					<td>
						<button type="button" class="btn btn-sm" ng-click="excluirItem(item)"><i class="fa fa-times"></i></button>
					</td>
				</tr>

				<tr>
					<td></td>
					<td></td>
					<td class="text-right"><b>Total</td>
					<td class="text-center"><b>{{valor_total | currency:'R$'}}</td>
					<td></td>
				</tr>

			</table>

		</div>
	</form> -->

</div>