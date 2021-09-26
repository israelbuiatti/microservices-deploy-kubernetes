'use strict';

angular.module('admin').controller('ProdutoCtrl', ["$scope", "$http", function ($scope, $http) {

	this.$onInit = () => {
		$scope.cancel();
		$scope.buscar();
		$scope.getListaFornecedor();
	}

	$scope.cancel = () => {
		$scope.state = "search";
		$scope.produto = {};
		$scope.busca = {};

	}

	$scope.preparaCadastrar = () => {
		$scope.state = "insert";

	}

	$scope.preparaAlterar = (item) => {
		$scope.state = "update";
		$scope.produto = angular.copy(item);
	}

	const validar = () => {

		if ($scope.isEmpty($scope.produto.id_fornecedor)) {
			alert('Campo Fornecedor obrigatório!');
			return false;
		}
		if ($scope.isEmpty($scope.produto.descricao)) {
			alert('Campo Descrição obrigatório!');
			return false;
		}

		return true;

	}

	$scope.cadastrar = () => {

		if (!validar()) return false;

		loadingOn();
		$http({ method: 'POST', url: URL_API + 'produto', data: $scope.produto })
			.then((response) => {

				alert("Produto cadastrado com sucesso. Número " + response.data.id);
				$scope.listaProdutos.push(response.data);
				$scope.cancel();


			}, (error) => alert(error.data.message))
			.finally(() => loadingOff());

	}

	$scope.alterar = () => {

		if (!validar()) return false;

		loadingOn();
		$http({ method: 'PUT', url: URL_API + 'produto/' + $scope.produto.id, data: $scope.produto })
			.then((response) => {

				alert("Produto alterado com sucesso.");
				$scope.cancel();
				$scope.buscar();


			}, (error) => alert(error.data.message))
			.finally(() => loadingOff());

	}

	$scope.excluir = (item) => {

		if (!confirm("Confirmar exclusão?")) return;

		loadingOn();
		$http({ method: 'DELETE', url: URL_API + 'produto/' + item.id })
			.then((response) => {

				alert("Produto excluido com sucesso.");
				$scope.cancel();
				$scope.buscar();


			}, (error) => alert(error.data.message))
			.finally(() => loadingOff());

	}

	$scope.buscar = () => {

		loadingOn();
		$http({ method: 'POST', url: URL_API + 'produto/busca', data: $scope.busca })
			.then(
				(response) => $scope.listaProdutos = response.data,
				(error) => alert(error.data.message)
			)
			.finally(() => loadingOff());

	}

	$scope.getListaFornecedor = () => {

		loadingOn();
		$http({ method: 'GET', url: URL_API + 'fornecedor' })
			.then(
				(response) => $scope.listaFornecedor = response.data,
				(error) => alert(error.data.message)
			)
			.finally(() => loadingOff());

	}


}]);

