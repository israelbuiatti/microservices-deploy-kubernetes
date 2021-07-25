<div class="form-group">
	<div class="col-sm-4">
		<label>Código</label>
		<input class="form-control" type="text" ng-model="fornecedor.id" disabled style="width:100px">
	</div>
</div>

<div class="form-group">
	<div class="col-sm-4">
		<label>Razão Social</label>
		<input class="form-control" type="text" ng-model="fornecedor.nome_razao">
	</div>

</div>

<div class="form-group">
	<div class="col-sm-4">
		<label>Endereço</label>
		<input class="form-control" type="text" ng-model="fornecedor.endereco">
	</div>
</div>

<div class="form-group">

	<div class="col-sm-3">
		<label>Bairro</label>
		<input class="form-control" type="text" ng-model="fornecedor.bairro">
	</div>

	<!-- <div class="col-sm-3">
		<label>Estado</label>
		<select class="form-control" ng-options="item.id as item.descricao for item in listaEstados" ng-model="fornecedor.id_estado" ng-change="changeEstado()">
			<option value=""> - Selecione - </option>
		</select>
	</div>

	<div class="col-sm-3">
		<label>Cidade</label>
		<select class="form-control" ng-options="item.id as item.descricao for item in listaCidades" ng-model="fornecedor.id_cidade">
			<option value=""> - Selecione - </option>
		</select>
	</div> -->

	<div class="col-sm-3">
		<label>Cidade</label>
		<input class="form-control" type="text" ng-model="fornecedor.cidade">
	</div>

	<div class="col-sm-1">
		<label>UF</label>
		<input class="form-control" type="text" ng-model="fornecedor.uf">
	</div>

</div>

<div class="form-group">
	<div class="col-sm-4">
		<label>CEP</label>
		<input class="form-control" type="text" ng-model="fornecedor.cep" style="width:100px" data-inputmask="'mask': '99999-999'" data-mask="">
	</div>
</div>

<div class="form-group">

	<div class="col-sm-4">
		<label>CNPJ</label>
		<input class="form-control" type="text" ng-model="fornecedor.cnpj">
	</div>

	<div class="col-sm-4">
		<label>CGF</label>
		<input class="form-control" type="text" ng-model="fornecedor.cgf">
	</div>

</div>

<div class="form-group">

	<div class="col-sm-3">
		<label>Comissão Representante:</label>

		<div class="input-group">
			<div class="input-group-addon">
				<i class="fa fa-percent"></i>
			</div>
			<input ng-model="fornecedor.comissao_repr" class="form-control moeda4">
		</div>
	</div>

	<div class=" col-sm-3">
		<label>Comissão Vendedor:</label>

		<div class="input-group">
			<div class="input-group-addon">
				<i class="fa fa-percent"></i>
			</div>
			<input ng-model="fornecedor.comissao_vend" class="form-control moeda4">
		</div>
	</div>

	<div class="col-sm-3">
		<label>Comissão Telemarketing:</label>

		<div class="input-group">
			<div class="input-group-addon">
				<i class="fa fa-percent"></i>
			</div>
			<input ng-model="fornecedor.comissao_tel" class="form-control moeda4">
		</div>
	</div>
</div>