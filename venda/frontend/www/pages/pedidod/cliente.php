<div class="box box-primary" ng-show="state == 'insert' || state == 'update'">
	<div class="box-header with-border">
		<h3 class="box-title">Cliente</h3>
	</div>

	<form class="form-horizontal">
		<div class="box-body">
			<div class="form-group">
				<div class="col-sm-4">
					<label>Código</label>
					<input class="form-control" type="text" ng-model="cliente.id" disabled style="width:100px">
				</div>

				<div class="col-sm-4">
					<label>CNPJ / CPF</label>
					<input class="form-control cpfCnpjMask" type="text" ng-model="cliente.cnpj" ng-blur="consultaCpfCnpj()" ng-disabled="state == 'update'">
				</div>
			</div>

			<div class="form-group">
				<div class="col-sm-4">
					<label>Razão Social</label>
					<input class="form-control" type="text" ng-model="cliente.nome_razao" ng-disabled="cliente.blocked">
				</div>

				<div class="col-sm-4">
					<label>Comprador</label>
					<input class="form-control" type="text" ng-model="cliente.comprador" ng-disabled="cliente.blocked">
				</div>
			</div>

			<div class="form-group">
				<div class="col-sm-4">
					<label>Endereço</label>
					<input class="form-control" type="text" ng-model="cliente.endereco" ng-disabled="cliente.blocked">
				</div>
			</div>

			<div class="form-group">

				<div class="col-sm-3">
					<label>Bairro</label>
					<input class="form-control" type="text" ng-model="cliente.bairro" ng-disabled="cliente.blocked">
				</div>

				<div class="col-sm-3">
					<label>Cidade</label>
					<select class="form-control" ng-options="item.id as item.descricao for item in listaCidades" ng-model="cliente.cidade" ng-disabled="cliente.blocked">
						<option value=""> - Selecione - </option>
					</select>
				</div>

			</div>

			<div class="form-group">
				<div class="col-sm-4">
					<label>CEP</label>
					<input class="form-control" type="text" ng-model="cliente.cep" style="width:100px" data-inputmask="'mask': '99999-999'" data-mask="" ng-disabled="cliente.blocked">
				</div>
			</div>

			<div class="form-group" style="padding-bottom:20px">

				<div class="col-sm-3">
					<label>Telefone 1:</label>

					<div class="input-group">
						<div class="input-group-addon">
							<i class="fa fa-phone"></i>
						</div>
						<input ng-model="cliente.tel1" class="form-control" ng-disabled="cliente.blocked">
					</div>
				</div>

				<div class=" col-sm-3">
					<label>Telefone 2:</label>

					<div class="input-group">
						<div class="input-group-addon">
							<i class="fa fa-phone"></i>
						</div>
						<input ng-model="cliente.tel2" class="form-control" ng-disabled="cliente.blocked">
					</div>
				</div>

			</div>
		</div>
	</form>
</div>