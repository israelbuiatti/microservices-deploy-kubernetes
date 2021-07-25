<div class="form-group">
	<div class="col-sm-4">
		<label>Código</label>
		<input class="form-control" type="text" ng-model="produto.id" disabled style="width:100px">
	</div>
</div>

<div class="form-group">
	<div class="col-sm-4">
		<label>Fornecedor</label>
		<select class="form-control" ng-options="item.id as item.nome_razao for item in listaFornecedor" ng-model="produto.id_fornecedor">
			<option value=""> - Selecione - </option>
		</select>
	</div>
</div>

<div class="form-group">
	<div class="col-sm-4">
		<label>Descrição</label>
		<input class="form-control" type="text" ng-model="produto.descricao">
	</div>
</div>