'use strict';

angular.module('admin').controller('ComissaoCtrl', ["$scope", "$http", function ($scope, $http) {

	//-----------------------

	$scope.isEmpty = (param) => {

		if (param == undefined || param == '') {
			return true;
		}
		return false;

	}

	//-----------------------


	this.$onInit = () => {
		$scope.state = "search";
		$scope.pedido = {};
		$scope.total = {};
		$scope.comissao = null;
		$scope.getListaFornecedor();
		$scope.getListaVendedor();
		$scope.buscar();
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

	$scope.getListaVendedor = () => {

		loadingOn();
		$http({ method: 'GET', url: URL_API + 'vendedor' })
			.then(
				(response) => {
					$scope.listaVendedor = response.data;
				},
				(error) => alert(error.data.message)
			)
			.finally(() => loadingOff());
	}


	//---------------------------------
	// NOVO
	//---------------------------------

	$scope.buscar = () => {

		$scope.pedido.data1 = $('#data1').val();
		$scope.pedido.data2 = $('#data2').val();

		if (
			$scope.isEmpty($scope.pedido.id_fornecedor) || 
			$scope.isEmpty($scope.pedido.id_vendedor) || 
			$scope.isEmpty($scope.pedido.data1) || 
			$scope.isEmpty($scope.pedido.data2)
			) {
				return false;	
			}


		loadingOn();
		$http({ method: 'POST', url: URL_API + 'comissao/busca', data: $scope.pedido })
			.then(
				(response) => { 
					
					$scope.listaPedido = response.data.lista;

					$scope.comissao = response.data.comissao;

					$scope.total.valor = 0;
					$scope.total.valor_baixado = 0;
					$scope.total.comissao = 0;

					$scope.listaPedido.forEach(value => {
						value.data = moment(value.data).add(1, 'days').format('DD/MM/yyyy');
						value.porcentagem = value.comissao / value.valor_baixado * 100;
						$scope.total.valor += value.valor;
						$scope.total.valor_baixado += value.valor_baixado;
						$scope.total.comissao += value.comissao;
					})


				},
				(error) => alert(error.data.message)
			)
			.finally(() => loadingOff());

	}

	$scope.changeData1 = () => {
		$scope.pedido.data1 = $('#data1').val();
	}

	$scope.changeData2 = () => {
		$scope.pedido.data2 = $('#data2').val();
	}

			
  }]);

  