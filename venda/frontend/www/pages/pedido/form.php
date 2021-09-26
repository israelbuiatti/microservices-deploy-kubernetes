<form class="form-horizontal">
	<div class="box-body">

		<div class="form-group">

			<div class="col-sm-2">
				<label>Pedido</label>
				<input class="form-control" ng-model="pedido.id" type="text" style="width:100px" ng-blur="pesquisarPedido()" ng-disabled=true ng-value="123">
			</div>

			<div class="col-sm-2">
				<label>Data</label>
				<input ng-model="pedido.data" id="pedido_data" class="form-control date" style="width:100px" />
			</div>

			<div class="col-sm-2">
				<label>Tipo Pagamento</label>
				<select class="form-control" ng-model="pedido.tipopag">
					<option value=""> - Selecione - </option>
					<option value="BOLETO"> Boleto </option>
					<option value="CHEQUE"> Cheque </option>
					<option value="PROMISSORIA"> Promissória </option>
				</select>
			</div>

			<div class="col-sm-2">
				<label>Prazo</label>
				<input class="form-control" id="inputEmail3" type="text" ng-model="pedido.prazo" style="width:100px">
			</div>

		</div>

		<div class="form-group">
			<div class="col-sm-4">
				<label>Cliente</label>
				<div>
					<input type="text" class="form-control" style="width:70%; float:left" value="{{cliente.nome_razao}}" disabled>
					<button data-toggle="modal" data-target="#myModal" style="float:left; height:34px" ng-click="abrirModalCliente()" class="btn btn-primary">Pesquisar</button>
					<div style="clear:both"></div>
				</div>

			</div>
			<div class="col-sm-4">
				<label>Fornecedor</label>
				<select class="form-control" ng-options="item.id as item.nome_razao for item in listaFornecedor" ng-model="pedido.id_fornecedor" ng-change="carregaFornecedor()">
					<option value=""> - Selecione - </option>
				</select>
			</div>

		</div>

		<div class="form-group" ng-if="userAccess.admin">
			<div class="col-sm-4">
				<label>Vendedor</label>
				<select class="form-control" ng-options="item.id as item.nome for item in listaVendedor" ng-model="pedido.id_vendedor">
					<option value=""> - Selecione - </option>
				</select>
			</div>
			<div class="col-sm-4">
				<label>Telemarketing</label>
				<select class="form-control" ng-options="item.id as item.nome for item in listaTelemarketing" ng-model="pedido.id_vendedor_tel">
					<option value=""> - Selecione - </option>
				</select>
			</div>
		</div>


		<div style="text-align:center">
			<button ng-if="state == 'insert'" type="submit" class="btn btn-primary" ng-click="cadastrar()">Cadastrar</button>
			<button ng-if="state == 'update'" type="submit" class="btn btn-primary" ng-click="alterar()">Alterar</button>
			<button class="btn" ng-click="cancel()">Voltar</button>
		</div>

	</div>
</form>