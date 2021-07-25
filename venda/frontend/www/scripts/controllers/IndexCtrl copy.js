'use strict';

angular.module('admin').controller('IndexCtrl', ["$scope", "$http", function ($scope, $http) {


	this.$onInit = async () => {

		alert(1);

		await $scope.getServicos();

		alert(2);

		console.log($scope.listaServicos);

		$scope.listaServicos.forEach(servico => {
			$scope.getHttp(servico);
		})

	}



	$scope.getServicos = () => {

		$http({ method: 'GET', url: URL_API_ACL + "/api/servicos" })
			.then(
				(response) => {
					alert(3)
					$scope.listaServicos = response.data
				},
				(error) => {
					alert(4);
					alert(error.data.message);
				}
			)

	}

	$scope.getHttp = (servico) => {

		$http({ method: 'GET', url: servico.url })
			.then(
				(response) => servico.status = true,
				(error) => servico.status = false
			)

	}



}]);

