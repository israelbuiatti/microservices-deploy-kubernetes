<form class="form-horizontal">
	<div class="box-body">



		<div class="nav-tabs-custom">
			<ul class="nav nav-tabs">
				<li class="active"><a href="#tab1" data-toggle="tab" aria-expanded="true">Dados</a></li>
				<li><a href="#tab2" data-toggle="tab" aria-expanded="false">Informações Bancárias</a></li>
				<li><a href="#tab3" data-toggle="tab">Informações Comerciais</a></li>
				<li><a href="#tab4" data-toggle="tab">Observações</a></li>
			</ul>
			<div class="tab-content">
				<div class="tab-pane active" id="tab1">
					<?php include("tab1.php") ?>
				</div>
				<div class="tab-pane" id="tab2">
					<?php include("tab2.php") ?>
				</div>
				<div class="tab-pane" id="tab3">
					<?php include("tab3.php") ?>
				</div>
				<div class="tab-pane" id="tab4">
					<?php include("tab4.php") ?>
				</div>
			</div>
		</div>



	</div>

	<div class="box-footer">
		<button ng-if="state == 'insert'" type="submit" class="btn btn-primary" ng-click="cadastrar()">Cadastrar</button>
		<button ng-if="state == 'update'" type="submit" class="btn btn-primary" ng-click="alterar()">Alterar</button>
		<button type="submit" class="btn" ng-click="cancel()">Cancelar</button>
	</div>

</form>