'use strict';

angular.module('admin').controller('IndexCtrl', ["$scope", "$http", function ($scope, $http) {


	$scope.listaServicos = [];

	//VENDA
	$scope.listaServicos.push({
		servico: "ms-venda-frontend",
		url: "http://frontend.venda.k8s.buiatte.com.br/health.php",
		status: null
	});

	$scope.listaServicos.push({
		servico: "ms-venda-backend",
		url: "http://backend.venda.k8s.buiatte.com.br/health",
		status: null
	});

	//ESTOQUE
	$scope.listaServicos.push({
		servico: "ms-estoque-frontend",
		url: "http://frontend.estoque.k8s.buiatte.com.br/health.php",
		status: null
	});

	$scope.listaServicos.push({
		servico: "ms-estoque-backend",
		url: "http://backend.estoque.k8s.buiatte.com.br/health",
		status: null
	});

	//FATURAMENTO
	$scope.listaServicos.push({
		servico: "ms-faturamento-frontend",
		url: "http://frontend.faturamento.k8s.buiatte.com.br/health.php",
		status: null
	});

	$scope.listaServicos.push({
		servico: "ms-faturamento-backend",
		url: "http://backend.faturamento.k8s.buiatte.com.br/health",
		status: null
	});

	//CAIXA
	$scope.listaServicos.push({
		servico: "ms-caixa-frontend",
		url: "http://frontend.caixa.k8s.buiatte.com.br/health.php",
		status: null
	});

	$scope.listaServicos.push({
		servico: "ms-caixa-backend",
		url: "http://backend.caixa.k8s.buiatte.com.br/health",
		status: null
	});

	//CEP
	$scope.listaServicos.push({
		servico: "consulta-cep",
		url: "http://cep.k8s.buiatte.com.br/health",
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


