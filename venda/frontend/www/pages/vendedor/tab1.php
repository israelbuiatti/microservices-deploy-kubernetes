<div class="form-group">
	<div class="col-sm-4">
		<label>Código</label>
		<input class="form-control" type="text" ng-model="vendedor.id" disabled style="width:100px">
	</div>
</div>

<div class="form-group">
	<div class="col-sm-4">
		<label>Nome</label>
		<input class="form-control" type="text" ng-model="vendedor.nome">
	</div>

</div>

<div class="form-group">
	<div class="col-sm-4">
		<label>Endereço</label>
		<input class="form-control" type="text" ng-model="vendedor.endereco">
	</div>
</div>

<div class="form-group">

	<div class="col-sm-3">
		<label>Bairro</label>
		<input class="form-control" type="text" ng-model="vendedor.bairro">
	</div>

	<!-- <div class="col-sm-3">
		<label>Estado</label>
		<select class="form-control" ng-options="item.id as item.descricao for item in listaEstados" ng-model="vendedor.id_estado" ng-change="changeEstado()">
			<option value=""> - Selecione - </option>
		</select>
	</div>

	<div class="col-sm-3">
		<label>Cidade</label>
		<select class="form-control" ng-options="item.id as item.descricao for item in listaCidades" ng-model="vendedor.id_cidade">
			<option value=""> - Selecione - </option>
		</select>
	</div> -->

	<div class="col-sm-3">
		<label>Cidade</label>
		<input class="form-control" type="text" ng-model="vendedor.cidade">
	</div>

	<div class="col-sm-1">
		<label>UF</label>
		<input class="form-control" type="text" ng-model="vendedor.uf">
	</div>

</div>

<div class="form-group">
	<div class="col-sm-4">
		<label>CEP</label>
		<input class="form-control" type="text" ng-model="vendedor.cep" style="width:100px" data-inputmask="'mask': '99999-999'" data-mask="">
	</div>
</div>

<div class="form-group">

	<div class="col-sm-4">
		<label>RG</label>
		<input class="form-control" type="text" ng-model="vendedor.rg">
	</div>

	<div class="col-sm-4">
		<label>CPF</label>
		<input class="form-control" type="text" ng-model="vendedor.cpf" data-inputmask="'mask': '999.999.999-99'" data-mask="">
	</div>

</div>

<div class="form-group">

	<div class="col-sm-3">
		<label>Telefone 1:</label>

		<div class="input-group">
			<div class="input-group-addon">
				<i class="fa fa-phone"></i>
			</div>
			<input ng-model="vendedor.tel1" class="form-control" data-inputmask="'mask': '(99) 99999-9999'" data-mask="">
		</div>
	</div>

	<div class=" col-sm-3">
		<label>Telefone 2:</label>

		<div class="input-group">
			<div class="input-group-addon">
				<i class="fa fa-phone"></i>
			</div>
			<input ng-model="vendedor.tel2" class="form-control" data-inputmask="'mask': '(99) 99999-9999'" data-mask="">
		</div>
	</div>

	<div class="col-sm-4">
		<label>Email:</label>

		<div class="input-group">
			<div class="input-group-addon">
				<i class="fa fa-envelope-o"></i>
			</div>
			<input ng-model="vendedor.email" class="form-control">
		</div>
	</div>
</div>