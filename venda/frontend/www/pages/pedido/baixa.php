<div class="box box-info" ng-show="state == 'update' && userAccess.admin">
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

		<div class="form-group" ng-show="!pedidoBaixa.nf">
			<div class="col-sm-2">
				<label>NF</label>
				<input class="form-control" ng-model="pedidoBaixaForm.nf" type="text" style="width:100px">
			</div>

			<div class="col-sm-2">
				<label>Data</label>
				<input ng-model="pedidoBaixaForm.data" class="form-control date" id='data_baixado' style="width:100px" />
			</div>

			<div class="col-sm-2">
				<label>Valor</label>
				<input class="form-control moeda" type="text" ng-model="pedidoBaixaForm.valor" style="width:100px">
			</div>

			<div class="col-sm-2" style="height: 60px;margin-top: 25px;">
				<button type="submit" class="btn btn-primary" ng-click="baixar()">Baixar</button>
			</div>

		</div>


		<table class="table">
			<tr>
				<th class="text-center"> NF </th>
				<th class="text-center"> Data </th>
				<th class="text-center"> Valor </th>
				<th class="text-center"> </th>
				<th class="text-center"> </th>
			</tr>
			<tr ng-if="pedidoBaixa.nf">
				<td class="text-center"> {{pedidoBaixa.nf}} </td>
				<td class="text-center"> {{pedidoBaixa.data}} </td>
				<td class="text-center"> {{pedidoBaixa.valor | currency:'R$ '}} </td>
				<td>
					<table>
						<tr ng-if="pedidoBaixa.comissao_vend">
							<td style="width:160px; text-align:right">Comissão Vendedor: </td>
							<td style="padding-left:10px">{{pedidoBaixa.comissao_vend | currency:'R$ '}}</td>
						</tr>
						<tr ng-if="pedidoBaixa.comissao_vend_d">
							<td style="width:160px; text-align:right">Comissão Vendedor: </td>
							<td style="padding-left:10px">{{pedidoBaixa.comissao_tel | currency:'R$ '}}</td>
						</tr>
						<tr ng-if="pedidoBaixa.comissao_sup_d">
							<td style="width:160px; text-align:right">Comissão Supervisor: </td>
							<td style="padding-left:10px">{{pedidoBaixa.comissao_sup_d | currency:'R$ '}}</td>
						</tr>
					</table>
				</td>
				<td>
					<button type="button" class="btn btn-sm" ng-click="excluirBaixa()" title="Excluir Baixa"><i class="fa fa-times"></i></button>
				</td>
			</tr>
		</table>



	</div>

</div>