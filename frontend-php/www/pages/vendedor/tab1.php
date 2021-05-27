<div class="form-group">
	<div class="col-sm-4">
		<label>Código</label>
		<input class="form-control" type="text" ng-model="vendedor.codigo" disabled style="width:100px">
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

	<div class="col-sm-3">
		<label>Estado</label>
		<select class="form-control" ng-model="vendedor.estado" ng-change="carregaFornecedor()">
			<option value=""> - Selecione - </option>
			<option ng-repeat="option1 in listaFornecedor" value="{{option1.id}}">{{option1.nome_razao}}</option>
		</select>
	</div>

	<div class="col-sm-3">
		<label>Cidade</label>
		<select class="form-control" ng-model="vendedor.cidade" ng-change="carregaFornecedor()">
			<option value=""> - Selecione - </option>
			<option ng-repeat="option1 in listaFornecedor" value="{{option1.id}}">{{option1.nome_razao}}</option>
		</select>
	</div>

</div>

<div class="form-group">
	<div class="col-sm-4">
		<label>CEP</label>
		<input class="form-control" type="text" ng-model="vendedor.cep" style="width:100px">
	</div>
</div>

<div class="form-group">

	<div class="col-sm-4">
		<label>RG</label>
		<input class="form-control" type="text" ng-model="vendedor.rg">
	</div>

	<div class="col-sm-4">
		<label>CPF</label>
		<input class="form-control" type="text" ng-model="vendedor.cpf">
	</div>

</div>

<div class="form-group">

	<div class="col-sm-3">
		<label>Telefone 1:</label>

		<div class="input-group">
			<div class="input-group-addon">
				<i class="fa fa-phone"></i>
			</div>
			<input ng-model="vendedor.telefone1" class="form-control">
		</div>
	</div>

	<div class=" col-sm-3">
		<label>Telefone 2:</label>

		<div class="input-group">
			<div class="input-group-addon">
				<i class="fa fa-phone"></i>
			</div>
			<input ng-model="vendedor.telefone2" class="form-control">
		</div>
	</div>

	<div class="col-sm-3">
		<label>Email:</label>

		<div class="input-group">
			<div class="input-group-addon">
				<i class="fa fa-envelope-o"></i>
			</div>
			<input ng-model="vendedor.email" class="form-control">
		</div>
	</div>
</div>