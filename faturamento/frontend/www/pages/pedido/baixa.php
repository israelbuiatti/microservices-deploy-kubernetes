<div class="box box-info" ng-show="state == 'update'">
	<div class="box-header with-border">
		<h3 class="box-title">Baixa</h3>
	</div>

	<div class="box-body">

		<div class="form-group">
			<div class="col-sm-12" style="margin-bottom:10px">
				Comissão vendedor: {{fornecedor.comissao_vend}}% <br>
				Comissão telemarketing: {{fornecedor.comissao_tel}}%
			</div>
		</div>

		<div class="form-group">
			<div class="col-sm-2">
				<label>NF</label>
				<input class="form-control" ng-model="pedido.nf_baixado" type="text" style="width:100px">
			</div>

			<div class="col-sm-2">
				<label>Data</label>
				<input ng-model="pedido.data_baixado" class="form-control date" id='data_baixado' style="width:100px" />
			</div>

			<div class="col-sm-2">
				<label>Valor</label>
				<input class="form-control moeda" type="text" ng-model="pedido.valor_baixado" style="width:100px">
			</div>

		</div>

		<div class="form-group">
			<div class="col-sm-12" style="margin-top:20px; text-align:center">
				<button type="submit" class="btn btn-primary" ng-click="baixar()">Baixar</button>
			</div>
		</div>



	</div>

</div>