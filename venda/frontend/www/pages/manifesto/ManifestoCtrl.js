'use strict';

angular.module('admin').controller('ManifestoCtrl', ["$scope", "$http", function ($scope, $http) {

	this.$onInit = () => {
		$scope.cancel();
		$scope.buscar();
	}


	$scope.cancel = () => {
		$scope.state = "search";
		$scope.busca = {};
		$scope.manifesto = {};
		$scope.pedidos = [];
		$scope.selecionados = [];
		$scope.selecionadosArr = [];
	}

	$scope.preparaCadastrar = () => {
		$scope.state = "insert";
		$scope.getPedidos();

	}

	$scope.preparaAlterar = (item) => {
		$scope.state = "update";
		$scope.manifesto = item;
		$scope.getPedidos();
		$scope.getManifestoItem(item.id);
	}

	$scope.getPedidos = () => {

		loadingOn();
		$http({ method: 'POST', url: URL_API + 'pedido/buscaPedidoManifesto'})
			.then((response) => {
				
				$scope.pedidos = response.data;

				$scope.pedidos.forEach(pedido => {

					pedido.data = moment(pedido.data).format('DD/MM/yyyy');

					pedido.quantidade_total = 0;
					pedido.itens.forEach(item => {
						pedido.quantidade_total += item.quantidade;
					})


				});

			}, (error) => alert(error.data.message))
			.finally(() => loadingOff());

	}

	$scope.getManifestoItem = (id_manifesto) => {

		loadingOn();
		$http({ method: 'POST', url: URL_API + 'pedido/buscaPedidoManifesto/'+id_manifesto })
			.then((response) => {

				$scope.selecionados = response.data;

				$scope.selecionados.forEach(pedido => {

					pedido.data = moment(pedido.data).format('DD/MM/yyyy');

					pedido.quantidade_total = 0;
					pedido.itens.forEach(item => {
						pedido.quantidade_total += item.quantidade;
					})


				});

			}, (error) => alert(error.data.message))
			.finally(() => loadingOff());

	}

	$scope.adicionarItem = (item) => {
		$scope.selecionados.push(item);

		const indice = $scope.pedidos.indexOf(item);
		$scope.pedidos.splice(indice, 1);
	}

	$scope.removerItem = (item) => {
		$scope.pedidos.push(item);

		const indice = $scope.selecionados.indexOf(item);
		$scope.selecionados.splice(indice, 1);
	}


	const validar = () => {

		$scope.manifesto.data = $('#data').val();

		if ($scope.isEmpty($scope.manifesto.data)) {
			alert('Campo Data obrigatório!');
			return false;
		}
		if ($scope.isEmpty($scope.manifesto.motorista)) {
			alert('Campo Motorista obrigatório!');
			return false;
		}

		$scope.manifesto.selecionados = [];

		$scope.selecionados.forEach(pedido => {
			$scope.manifesto.selecionados.push({id_pedido: pedido.id});
		});

		if ($scope.manifesto.selecionados.length == 0) {
			alert('Selecione pelo menos um pedido!');
			return false;
		}

		return true;

	}

	$scope.cadastrar = () => {
		
		if (!validar()) return false;


		loadingOn();
		$http({ method: 'POST', url: URL_API + 'manifesto', data: $scope.manifesto })
			.then((response) => {

				alert("Manifesto cadastrado com sucesso. Número " + response.data.id);
				$scope.cancel();
				$scope.buscar();

			}, (error) => alert(error.data.message))
			.finally(() => loadingOff());

	}

	$scope.alterar = () => {

		if (!validar()) return false;
		
		console.log(1, $scope.manifesto.selecionados);

		loadingOn();
		$http({ method: 'PUT', url: URL_API + 'manifesto/' + $scope.manifesto.id, data: $scope.manifesto })
			.then((response) => {

				alert("Manifesto alterado com sucesso.");
				$scope.cancel();
				$scope.buscar();


			}, (error) => alert(error.data.message))
			.finally(() => loadingOff());

	}

	$scope.excluir = (item) => {

		if (!confirm("Confirmar exclusão?")) return;

		loadingOn();
		$http({ method: 'DELETE', url: URL_API + 'manifesto/' + item.id })
			.then((response) => {

				alert("Manifesto excluido com sucesso.");
				$scope.cancel();
				$scope.buscar();


			}, (error) => alert(error.data.message))
			.finally(() => loadingOff());

	}

	$scope.buscar = () => {

		loadingOn();
		$http({ method: 'POST', url: URL_API + 'manifesto/busca', data: $scope.busca })
			.then(
				(response) => { 
					$scope.lista = response.data 
					$scope.lista.forEach(value => {
						value.data = moment(value.data).format('DD/MM/yyyy');
					})
				},
				(error) => alert(error.data.message)
			)
			.finally(() => loadingOff());

	}

	$scope.imprimir = (item) => {
		window.open(URL_BASE + "/pages/manifesto/imprimir.php?id_manifesto=" + item.id + "&token=" + MS_TOKEN, 'name', 'height=500,width=900');
	}


}]);

