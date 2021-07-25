'use strict';

angular.module('admin').controller('FornecedorCtrl', ["$scope", "$http", function ($scope, $http) {

	this.$onInit = () => {
		$scope.cancel();
		$scope.getEstados();
		$scope.buscar();
	}


	//---------------
	$scope.isEmpty = (param) => {

		if (param == undefined || param == '') {
			return true;
		}
		return false;

	}


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
		$scope.getCidades($scope.fornecedor.id_estado);
	}

	//---------------

	$scope.cancel = () => {
		$scope.state = "search";
		$scope.fornecedor = {};
		$scope.busca = {};

	}

	$scope.preparaCadastrar = () => {
		$scope.state = "insert";

	}

	$scope.preparaAlterar = (item) => {
		$scope.state = "update";
		$scope.fornecedor = angular.copy(item);
		$scope.changeEstado();

	}

	const validar = () => {

		if ($scope.isEmpty($scope.fornecedor.nome_razao)) {
			alert('Campo Razão Social obrigatório!');
			return false;
		}

		return true;

	}

	$scope.cadastrar = () => {

		if (!validar()) return false;

		loadingOn();
		$http({ method: 'POST', url: URL_API + 'fornecedor', data: $scope.fornecedor })
			.then((response) => {

				alert("Fornecedor cadastrado com sucesso. Número " + response.data.id);
				$scope.listaFornecedores.push(response.data);
				$scope.cancel();


			}, (error) => alert(error.data.message))
			.finally(() => loadingOff());

	}

	$scope.alterar = () => {

		if (!validar()) return false;

		loadingOn();
		$http({ method: 'PUT', url: URL_API + 'fornecedor/' + $scope.fornecedor.id, data: $scope.fornecedor })
			.then((response) => {

				alert("Fornecedor alterado com sucesso.");
				$scope.cancel();
				$scope.buscar();


			}, (error) => alert(error.data.message))
			.finally(() => loadingOff());

	}

	$scope.excluir = (item) => {

		if (!confirm("Confirmar exclusão?")) return;

		loadingOn();
		$http({ method: 'DELETE', url: URL_API + 'fornecedor/' + item.id })
			.then((response) => {

				alert("Fornecedor excluido com sucesso.");
				$scope.cancel();
				$scope.buscar();


			}, (error) => alert(error.data.message))
			.finally(() => loadingOff());

	}

	$scope.buscar = () => {

		loadingOn();
		$http({ method: 'POST', url: URL_API + 'fornecedor/busca', data: $scope.busca })
			.then(
				(response) => $scope.listaFornecedores = response.data,
				(error) => alert(error.data.message)
			)
			.finally(() => loadingOff());

	}


}]);

