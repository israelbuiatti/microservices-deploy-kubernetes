'use strict';

angular.module('admin').controller('LoginCtrl', ["$scope", "$http", function ($scope, $http) {

	$scope.login = {};


	this.$onInit = () => {


	}



	$scope.login = () => {

		loadingOn();
		$http({ method: 'POST', url: URL_API_CONSULTA_CEP + '/acl' })
			.then(
				(response) => $scope.listaEstados = response.data,
				(error) => alert("Usuário ou senha invalido!")
			)
			.finally(() => loadingOff());

	}



}]);


