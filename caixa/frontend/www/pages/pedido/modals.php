<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="myModalLabel">Cliente</h4>
			</div>
			<div class="modal-body">

				<input type="text" ng-change="buscarModal()" ng-model="buscaModal.nome_razao" class="form-control input-lg" placeholder="Digite o nome do cliente" autofocus autocomplete="off">
				<hr>
				<table class="table">
					<tr ng-repeat="cliente in clientes">
						<td width="100px"> <button ng-click="selecionar(cliente)" data-dismiss="modal">selecionar</button> </td>
						<td> {{cliente.nome_razao}} </td>
					</tr>
				</table>

			</div>
		</div>
	</div>
</div>

<div class="modal fade" id="modalProduto" tabindex="-1" role="dialog" aria-labelledby="modalProdutoLabel">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<h4 class="modal-title" id="modalProdutoLabel">Produto</h4>
			</div>
			<div class="modal-body">

				<input type="text" ng-change="pesquisarProduto()" ng-model="buscaModalProduto.descricao" class="form-control input-lg" placeholder="Digite o produto" autofocus autocomplete="off">
				<hr>
				<table class="table">
					<tr ng-repeat="produto in produtos">
						<td>
							<button ng-click="selecionarProduto(produto)" data-dismiss="modal">selecionar</button>
						</td>
						<td>{{produto.descricao}} - {{produto.id}}</td>
					</tr>
				</table>

			</div>
		</div>
	</div>
</div>