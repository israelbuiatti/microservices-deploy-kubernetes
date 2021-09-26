<div class="box box-primary" ng-show="state == 'insert' || state == 'update'">
	<div class="box-header with-border">
		<h3 class="box-title">Pedido</h3>
	</div>

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
						<option value="CHEQUE"> Cheque </option>
						<option value="PROMISSORIA"> Promissória </option>
					</select>
				</div>

				<div class="col-sm-2">
					<label>Prazo</label>
					<select class="form-control" ng-model="pedido.prazo">
						<option value=""> - Selecione - </option>
						<option value="BOLETO"> 14 Dias </option>
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
			</div>

			<div style="text-align:center">
				<button ng-if="state == 'insert'" type="submit" class="btn btn-primary" ng-click="cadastrar()">Cadastrar</button>
				<button ng-if="state == 'update'" type="submit" class="btn btn-primary" ng-click="alterar()">Alterar</button>
				<button class="btn" ng-click="cancel()">Voltar</button>
			</div>

		</div>
	</form>
</div>