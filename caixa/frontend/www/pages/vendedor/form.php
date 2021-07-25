<form class="form-horizontal">
	<div class="box-body">



		<div class="nav-tabs-custom">
			<ul class="nav nav-tabs">
				<li class="active"><a href="#tab1" data-toggle="tab" aria-expanded="true">Dados</a></li>
			</ul>
			<div class="tab-content">
				<div class="tab-pane active" id="tab1">
					<?php include("tab1.php") ?>
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