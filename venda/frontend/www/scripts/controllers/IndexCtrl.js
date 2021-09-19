'use strict';

angular.module('admin').controller('IndexCtrl', ["$scope", "$http", function ($scope, $http) {


	$scope.listaServicos = [];

	//VENDA
	$scope.listaServicos.push({
		servico: "ms-venda-frontend",
		url: "http://frontend.venda.buiatti.me/health.php",
		status: null
	});

	$scope.listaServicos.push({
		servico: "ms-venda-backend",
		url: "http://backend.venda.buiatti.me/health",
		status: null
	});

	//ESTOQUE
	$scope.listaServicos.push({
		servico: "ms-estoque-frontend",
		url: "http://frontend.estoque.buiatti.me/health.php",
		status: null
	});

	$scope.listaServicos.push({
		servico: "ms-estoque-backend",
		url: "http://backend.estoque.buiatti.me/health",
		status: null
	});

	//FATURAMENTO
	$scope.listaServicos.push({
		servico: "ms-faturamento-frontend",
		url: "http://frontend.faturamento.buiatti.me/health.php",
		status: null
	});

	$scope.listaServicos.push({
		servico: "ms-faturamento-backend",
		url: "http://backend.faturamento.buiatti.me/health",
		status: null
	});

	//CAIXA
	$scope.listaServicos.push({
		servico: "ms-caixa-frontend",
		url: "http://frontend.caixa.buiatti.me/health.php",
		status: null
	});

	$scope.listaServicos.push({
		servico: "ms-caixa-backend",
		url: "http://backend.caixa.buiatti.me/health",
		status: null
	});

	//CEP
	$scope.listaServicos.push({
		servico: "consulta-cep",
		url: "http://cep.buiatti.me/health",
		status: null
	});

	//ACL
	$scope.listaServicos.push({
		servico: "acl",
		url: "http://acl.buiatti.me/api/health",
		status: null
	});



	this.$onInit = () => {

		$scope.listaServicos.forEach(servico => {
			$scope.getHttp(servico);
		})

	}



	$scope.getHttp = (servico) => {
		
		$http({ method: 'GET', url: servico.url })
			.then(
				(response) => servico.status = true,
				(error) => servico.status = false
			)

	}



}]);


