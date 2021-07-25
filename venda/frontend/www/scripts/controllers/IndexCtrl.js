'use strict';

angular.module('admin').controller('IndexCtrl', ["$scope", "$http", function ($scope, $http) {


	const urls = [
		"http://backend.venda.k8s.buiatte.com.br/health",
		"http://localhost:88/health.php",

		"http://backend.estoque.k8s.buiatte.com.br/health",
		"http://frontned.estoque.k8s.buiatte.com.br/",

		"http://backend.faturamento.k8s.buiatte.com.br/health",
		"http://frontend.faturamento.k8s.buiatte.com.br/",

		"http://backend.caixa.k8s.buiatte.com.br/health",
		"http://frontend.caixa.k8s.buiatte.com.br/",
		
		"http://cep.k8s.buiatte.com.br/health",
	];

	this.$onInit = () => {

		urls.forEach(value => {
			$scope.getHttp(value);
		})

	}



	$scope.getHttp = (url) => {
		
		$http({ method: 'GET', url: url })
			.then(
				//(response) => $scope.listaEstados = response.data,
				//(error) => alert(error.data.message)
			)

	}



}]);

