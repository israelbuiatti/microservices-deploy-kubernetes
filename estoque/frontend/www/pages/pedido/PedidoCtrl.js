'use strict';

angular.module('admin').controller('PedidoCtrl', ["$scope", "$http", function ($scope, $http) {

	//-----------------------

	$scope.isEmpty = (param) => {

		if (param == undefined || param == '') {
			return true;
		}
		return false;

	}

	//-----------------------


	this.$onInit = () => {
		$scope.cancel();
		$scope.reset();
		$scope.getListaFornecedor();
		$scope.getListaVendedor();
		$scope.getListaVendedorTelemarketing();
		$scope.buscar();
	}

	$scope.reset = () => {
		$scope.pedido = {};
		$scope.pedido.pedido = ID;
		$scope.fornecedor = {};
		$scope.baixa = {};
		$scope.pItem = {};
		$scope.produto = {};
		$scope.cliente = {};
		$scope.itens = [];
		$scope.pedidoItem = false;
		$scope.valor_total = 0.0;
		$('#datetimepicker4').val('');
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

	$scope.getListaVendedorTelemarketing = () => {

		loadingOn();
		$http({ method: 'GET', url: URL_API + 'vendedor?telemarketing=true' })
			.then(
				(response) => {
					$scope.listaTelemarketing = response.data;
				},
				(error) => alert(error.data.message)
			)
			.finally(() => loadingOff());
	}
	
	
	const validar = () => {

		if ($scope.isEmpty($scope.pedido.data)) {
			alert('Campo data obrigatório!');
			return false;
		}
		if ($scope.isEmpty($scope.pedido.tipopag)) {
			alert('Campo tipo pagamento obrigatório!');
			return false;
		}
		if ($scope.isEmpty($scope.pedido.prazo)) {
			alert('Campo prazo obrigatório!');
			return false;
		}
		if ($scope.isEmpty($scope.pedido.id_cliente)) {
			alert('Campo cliente obrigatório!');
			return false;
		}
		if ($scope.isEmpty($scope.pedido.id_fornecedor)) {
			alert('Campo fornecedor obrigatório!');
			return false;
		}
		if ($scope.isEmpty($scope.pedido.id_vendedor)) {
			alert('Campo vendedor obrigatório!');
			return false;
		}

		return true;

	}
	
	$scope.cadastrar = function() {

		$scope.pedido.data = $('#pedido_data').val();
		
		if (!validar()) return false;

		loadingOn();
		$http({method: 'POST',url: URL_API + 'pedido',data: $scope.pedido})
			.then((response) => {
				
				alert("Pedido cadastrado com sucesso. Número " + response.data.id);
				$scope.state = "update";
				$scope.pedido.id = response.data.id;
			
			}, (error) => {
				console.log('Ocorreu um erro!');
				alert(error.data);
			})
			.finally(() => loadingOff());
		
	}

	$scope.alterar = function () {

		$scope.pedido.data = $('#pedido_data').val();

		if (!validar()) return false;

		loadingOn();
		$http({ method: 'PUT', url: URL_API + 'pedido/'+$scope.pedido.id, data: $scope.pedido })
			.then((response) => {

				alert("Pedido alterado com sucesso.");
				$scope.state = "update";
				$scope.pedido.id = response.data.id;

			}, (error) => {
				console.log('Ocorreu um erro!');
				alert(error.data);
			})
			.finally(() => loadingOff());

	}
	
	 
	$scope.carregaFornecedor = () => {
		$http({method: 'GET',url: URL_API + 'fornecedor/'+$scope.pedido.id_fornecedor})
			.then((response) => {
				$scope.fornecedor = response.data;
				
				//$scope.fornecedor.comissao_vend = ($scope.fornecedor.comissao_vend*100)+'%';
				
			}, (error) => {
				console.log('Ocorreu um erro!');
			});
	}
	


	//---------------------------------
	// NOVO
	//---------------------------------

	$scope.preparaCadastrar = () => {
		$scope.state = "insert";
		$scope.reset();
	}

	$scope.preparaAlterar = (item) => {
		$scope.state = "update";
		$scope.pedido = angular.copy(item);
		$scope.cliente.nome_razao = $scope.pedido.nome_razao;
		$scope.getListaPedidoItem();
		$scope.carregaFornecedor();
	}


	$scope.cancel = () => {
		$scope.state = "search";
		$scope.buscaModal = {};
		$scope.buscaModalProduto = {};
	}

	$scope.buscar = () => {

		loadingOn();
		$http({ method: 'POST', url: URL_API + 'pedido/busca', data: $scope.busca })
			.then(
				(response) => { 
					
					$scope.listaPedido = response.data 

					$scope.listaPedido.forEach(value => {
						value.data = moment(value.data).format('DD/MM/yyyy');
					})


				},
				(error) => alert(error.data.message)
			)
			.finally(() => loadingOff());

	}


	$scope.excluir = (item) => {

		if (!confirm("Confirma exclusão?")) {
			return;
		}

		loadingOn();
		$http({ method: 'DELETE', url: URL_API + 'pedido/' + item.id })
			.then((response) => {
				$scope.buscar();
			}, (error) => {
				console.log('Ocorreu um erro!');
			})
			.finally(() => loadingOff());;
	}


	//---------------------------------
	// MODAL CLIENTE
	//---------------------------------

	$scope.buscarModal = () => {

		if ($scope.buscaModal.nome_razao.length > 3) {
			loadingOn();
			$http({ method: 'POST', url: URL_API + 'cliente/busca', data: $scope.buscaModal })
				.then(
					(response) => $scope.clientes = response.data,
					(error) => console.log('Ocorreu um erro!')
				)
				.finally(() => loadingOff());
		}

	}

	$scope.selecionar = (cliente) => {
		$scope.cliente = cliente;
		$scope.pedido.id_cliente = cliente.id;
	}

	$scope.abrirModalCliente = () => {
		$scope.buscaModal = {};
		$scope.clientes = [];
	}


	//---------------------------------
	// MODAL PRODUTO
	//---------------------------------

	$scope.abrirModalProduto = () => {
		//$scope.buscaModalProduto = {};
		//$scope.produtos = [];
	}

	$scope.selecionarProduto = function (produto) {
		$scope.pItem.id_produto = produto.id;
		$scope.pItem.descricao = produto.descricao;
		$scope.buscaModalProduto = {};
	}

	$scope.pesquisarProduto = () => {

		$scope.buscaModalProduto.id_fornecedor = $scope.pedido.id_fornecedor;

		if ($scope.buscaModalProduto.descricao.length > 2) {
			loadingOn();
			$http({ method: 'POST', url: URL_API + 'produto/busca', data: $scope.buscaModalProduto })
				.then((response) => {
					$scope.produtos = response.data;
				}, (error) => {
					console.log('Ocorreu um erro!');
				})
				.finally(() => loadingOff());
		}

	}

	//---------------------------------
	// ITENS DO PEDIDO
	//---------------------------------

	var contains = (a, obj) => {
		for (var i = 0; i < a.length; i++) {
			if (a[i]['id_produto'] == obj['id_produto']) {
				return true;
			}
		}
		return false;
	}

	$scope.adicionarItem = () => {

		if ($scope.isEmpty($scope.pItem.id_produto)) {
			alert('Campo produto obrigatório!');
			return;
		}

		if ($scope.isEmpty($scope.pItem.quantidade)) {
			alert('Campo quantidade obrigatório!');
			return;
		}
		if ($scope.isEmpty($scope.pItem.valor_unitario)) {
			alert('Campo preco obrigatório!');
			return;
		}

		$scope.pItem.id_pedido = $scope.pedido.id;

		if (!contains($scope.itens, $scope.pItem)) {

			loadingOn();
			$http({ method: 'POST', url: URL_API + 'pedidoItem', data: $scope.pItem })
				.then((response) => {
					response.data.descricao = $scope.pItem.descricao;
					$scope.itens.push(response.data);
					$scope.produto = {};
					$scope.pItem = {};
					calculaValorTotalPedido();
				}, (error) => {
					console.log('Ocorreu um erro!');
				})
				.finally(() => loadingOff());;

		}
		else {
			alert('Erro! Produto já inserido!');
			$scope.produto = {};
			$scope.pItem = {};
		}

	}

	let calculaValorTotalPedido  = () => {
		$scope.valor_total = 0.0;
		
		$scope.itens.forEach(item => {
			console.log('item', item);
			$scope.valor_total += item.quantidade * item.valor_unitario;
		})
	}

	$scope.getListaPedidoItem = () => {

		loadingOn();
		$http({ method: 'GET', url: URL_API + 'pedidoItem/' + $scope.pedido.id })
			.then(
				(response) => {
					$scope.itens = response.data;
					calculaValorTotalPedido();
				},
				(error) => alert(error.data.message)
			)
			.finally(() => loadingOff());
	}

	$scope.excluirItem = (item) => {

		if (!confirm("Confirma exclusão?")) {
			return;
		}

		loadingOn();
		$http({ method: 'DELETE', url: URL_API + 'pedidoItem/' + item.id })
			.then((response) => {
				$scope.getListaPedidoItem();
			}, (error) => {
				console.log('Ocorreu um erro!');
			})
			.finally(() => loadingOff());;
	}

	//---------------------------------
	// Baixar
	//---------------------------------

	$scope.baixar = function () {
		$scope.pedido.data_baixado = $('#data_baixado').val();
		if ($scope.isEmpty($scope.pedido.nf_baixado)) {
			alert('Campo NF obrigatório!');
			return;
		}
		if ($scope.isEmpty($scope.pedido.data_baixado)) {
			alert('Campo Data obrigatório!');
			return;
		}
		if ($scope.isEmpty($scope.pedido.valor_baixado)) {
			alert('Campo Valor obrigatório!');
			return;
		}

		loadingOn();
		$http({ method: 'POST', url: URL_API + 'services/baixa', data: { pedidox: $scope.pedido } }).then(function successCallback(response) {
			alert('Pedido baixado com sucesso!');
			$scope.pItem = {};
			loadingOff();
		}, function errorCallback(response) {
			console.log('Ocorreu um erro!');
		});

	}

			
  }]);

  