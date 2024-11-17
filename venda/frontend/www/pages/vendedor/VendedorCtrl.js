'use strict';

angular.module('admin').controller('VendedorCtrl', ["$scope", "$http", function ($scope, $http) {

	this.$onInit = () => {
		$scope.cancel();
		//$scope.getEstados();
		$scope.buscar();
	}


	//---------------

	$scope.getEstados = () => {

		loadingOn();
		$http({ method: 'GET', url: URL_API_CONSULTA_CEP + 'estado' })
			.then(
				(response) => $scope.listaEstados = response.data,
				(error) => alert(error.data.message)
			)
			.finally(() => loadingOff());

	}


	$scope.getCidades = (id) => {

		if (!id) return;

		loadingOn();
		$http({ method: 'GET', url: URL_API_CONSULTA_CEP + 'cidade/' + id })
			.then(
				(response) => $scope.listaCidades = response.data,
				(error) => alert(error.data.message)
			)
			.finally(() => loadingOff());

	}

	$scope.changeEstado = () => {
		$scope.getCidades($scope.vendedor.id_estado);
	}

	//---------------

	$scope.cancel = () => {
		$scope.state = "search";
		$scope.vendedor = {};
		$scope.busca = {};

	}

	$scope.preparaCadastrar = () => {
		$scope.state = "insert";

	}

	$scope.preparaAlterar = (item) => {
		$scope.state = "update";
		$scope.vendedor = angular.copy(item);
		$scope.changeEstado();

	}

	const validar = () => {

		if ($scope.isEmpty($scope.vendedor.nome)) {
			alert('Campo Nome obrigatório!');
			return false;
		}

		return true;

	}

	$scope.cadastrar = () => {

		if (!validar()) return false;

		loadingOn();
		$http({ method: 'POST', url: URL_API + 'vendedor', data: $scope.vendedor })
			.then((response) => {

				alert("Vendedor cadastrado com sucesso. Número " + response.data.id);
				$scope.listaVendedor.push(response.data);
				$scope.cancel();


			}, (error) => alert(error.data.message))
			.finally(() => loadingOff());

	}

	$scope.alterar = () => {

		if (!validar()) return false;

		loadingOn();
		$http({ method: 'PUT', url: URL_API + 'vendedor/' + $scope.vendedor.id, data: $scope.vendedor })
			.then((response) => {

				alert("Vendedor alterado com sucesso.");
				$scope.cancel();
				$scope.buscar();


			}, (error) => alert(error.data.message))
			.finally(() => loadingOff());

	}

	$scope.excluir = (item) => {

		if (!confirm("Confirmar exclusão?")) return;

		loadingOn();
		$http({ method: 'DELETE', url: URL_API + 'vendedor/' + item.id })
			.then((response) => {

				alert("Vendedor excluido com sucesso.");
				$scope.cancel();
				$scope.buscar();


			}, (error) => alert(error.data.message))
			.finally(() => loadingOff());

	}

	$scope.buscar = () => {

		loadingOn();
		$http({ method: 'POST', url: URL_API + 'vendedor/busca', data: $scope.busca })
			.then(
				(response) => $scope.listaVendedor = response.data,
				(error) => alert(error.data.message)
			)
			.finally(() => loadingOff());

	}


}]);

