<div class="form-group">
	<div class="col-sm-4">
		<label>Código</label>
		<input class="form-control" type="text" ng-model="cliente.id" disabled style="width:100px">
	</div>
</div>

<div class="form-group">
	<div class="col-sm-4">
		<label>Razão Social</label>
		<input class="form-control" type="text" ng-model="cliente.nome_razao">
	</div>

	<div class="col-sm-4">
		<label>Comprador</label>
		<input class="form-control" type="text" ng-model="cliente.comprador">
	</div>
</div>

<div class="form-group">
	<div class="col-sm-4">
		<label>Endereço</label>
		<input class="form-control" type="text" ng-model="cliente.endereco">
	</div>
</div>

<div class="form-group">

	<div class="col-sm-3">
		<label>Bairro</label>
		<input class="form-control" type="text" ng-model="cliente.bairro">
	</div>

	<!-- <div class="col-sm-3">
		<label>Estado</label>
		<select class="form-control" ng-options="item.id as item.descricao for item in listaEstados" ng-model="cliente.id_estado" ng-change="changeEstado()">
			<option value=""> - Selecione - </option>
		</select>
	</div>

	<div class="col-sm-3">
		<label>Cidade</label>
		<select class="form-control" ng-options="item.id as item.descricao for item in listaCidades" ng-model="cliente.id_cidade">
			<option value=""> - Selecione - </option>
		</select>
	</div> -->

	<div class="col-sm-3">
		<label>Cidade</label>
		<select class="form-control" ng-options="item.id as item.descricao for item in listaCidades" ng-model="cliente.cidade">
			<option value=""> - Selecione - </option>
		</select>
	</div>

	<div class="col-sm-1">
		<label>UF</label>
		<input class="form-control" type="text" ng-model="cliente.uf">
	</div>

</div>

<div class="form-group">
	<div class="col-sm-4">
		<label>CEP</label>
		<input class="form-control" type="text" ng-model="cliente.cep" style="width:100px" data-inputmask="'mask': '99999-999'" data-mask="">
	</div>
</div>

<div class="form-group">

	<div class="col-sm-4">
		<label>CNPJ</label>
		<input class="form-control" type="text" ng-model="cliente.cnpj">
	</div>

	<div class="col-sm-4">
		<label>CGF</label>
		<input class="form-control" type="text" ng-model="cliente.cgf">
	</div>

</div>

<div class="form-group">

	<div class="col-sm-3">
		<label>Região</label>
		<select class="form-control" ng-options="item.id as item.descricao for item in listaRegiao" ng-model="cliente.id_regiao">
			<option value=""> - Selecione - </option>
		</select>
	</div>

</div>


<div class="form-group">

	<div class="col-sm-3">
		<label>Telefone 1:</label>

		<div class="input-group">
			<div class="input-group-addon">
				<i class="fa fa-phone"></i>
			</div>
			<input ng-model="cliente.tel1" class="form-control">
		</div>
	</div>

	<div class=" col-sm-3">
		<label>Telefone 2:</label>

		<div class="input-group">
			<div class="input-group-addon">
				<i class="fa fa-phone"></i>
			</div>
			<input ng-model="cliente.tel2" class="form-control">
		</div>
	</div>

	<div class="col-sm-3">
		<label>Telefone 3:</label>

		<div class="input-group">
			<div class="input-group-addon">
				<i class="fa fa-phone"></i>
			</div>
			<input ng-model="cliente.fax" class="form-control">
		</div>
	</div>
</div>