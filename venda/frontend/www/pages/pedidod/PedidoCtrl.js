'use strict';

angular.module('admin').controller('PedidoCtrl', ["$scope", "$http", function ($scope, $http) {


	this.$onInit = () => {
		$scope.reset();
		$scope.cancel();
		$scope.getCidades();
		$scope.getListaVendedor();
	}

	$scope.reset = () => {
		$scope.busca = {};
		$scope.pedido = {};
		$scope.pedido.pedido = ID;
		$scope.fornecedor = {};
		$scope.baixa = {};
		$scope.pItem = {};
		$scope.pedidoBaixa = {};
		$scope.produto = {};
		$scope.cliente = {};
		$scope.itens = [];
		$scope.pedidoItem = false;
		$scope.valor_total = 0.0;
		$('#datetimepicker4').val('');
	}

	const validarCliente = () => {

		if ($scope.isEmpty($scope.cliente.cnpj)) {
			alert('Campo CPF/CNPJ obrigatório!');
			return false;
		}

		if (!validaCpfCnpj($scope.cliente.cnpj) && $scope.state == 'insert') {
			alert('CPF/Cnpj Inválido!');
			return false;
		}

		if ($scope.isEmpty($scope.cliente.nome_razao)) {
			alert('Campo Razão Social obrigatório!');
			return false;
		}
		if ($scope.isEmpty($scope.cliente.comprador)) {
			alert('Campo Comprador obrigatório!');
			return false;
		}
		if ($scope.isEmpty($scope.cliente.cidade)) {
			alert('Campo Cidade obrigatório!');
			return false;
		}

		return true;

	}

	const validarPedido = () => {

		if ($scope.isEmpty($scope.pedido.data)) {
			alert('Campo Data obrigatório!');
			return false;
		}
		if ($scope.isEmpty($scope.pedido.tipopag)) {
			alert('Campo Tipo Pagamento obrigatório!');
			return false;
		}
		if ($scope.isEmpty($scope.pedido.prazo)) {
			alert('Campo Prazo obrigatório!');
			return false;
		}
		if ($scope.isEmpty($scope.pedido.id_vendedor) && $scope.userAccess.admin) {
			alert('Campo Vendedor obrigatório!');
			return false;
		}
		
		return true;

	}

	$scope.getCidades = () => {

		loadingOn();
		$http({ method: 'GET', url: URL_API + 'cidade/dist' })
			.then(
				(response) => $scope.listaCidades = response.data,
				(error) => alert(error.data.message)
			)
			.finally(() => loadingOff());

	}

	$scope.getListaVendedor = () => {

		loadingOn();
		$http({ method: 'GET', url: URL_API + 'vendedor?vendedor=true' })
			.then(
				(response) => {
					$scope.listaVendedor = response.data;
				},
				(error) => alert(error.data.message)
			)
			.finally(() => loadingOff());
	}



	$scope.getCliente = () => {

		loadingOn();
		$http({ method: 'GET', url: URL_API + 'cliente/'+$scope.pedido.id_cliente })
			.then(
				(response) => {
					$scope.cliente = response.data
					$scope.cliente.blocked = true;
				},
				(error) => alert(error.data.message)
			)
			.finally(() => loadingOff());

	}

	$scope.consultaCpfCnpj = () => {

		const objConsulta = { 
			cnpj: $scope.cliente.cnpj,
			flg_distribuidora: true
		}

		loadingOn();
		$http({ method: 'POST', url: URL_API + 'cliente/busca', data: objConsulta })
			.then(
				(response) => { 
					const cnpj = $scope.cliente.cnpj;
					if (response.data[0]) {
						$scope.cliente = response.data[0];
						$scope.cliente.blocked = true;
					}
					else {
						$scope.cliente = { cnpj: cnpj };
					}
				},
				(error) => { 
					$scope.cliente = { cnpj: cnpj };
					alert(error.data.message); 
				}
			)
			.finally(() => loadingOff());

	}

	$scope.cadastrar = () => {

		$scope.pedido.data = $('#pedido_data').val();

		if (!validarCliente()) return false;

		if (!validarPedido()) return false;

		if ($scope.cliente.id) { //CLIENTE JÁ CADASTRADO

			$scope.cadastrarPedido();

		}
		else { //CADASTRAR CLIENTE

			loadingOn();
			$http({ method: 'POST', url: URL_API + 'cliente', data: $scope.cliente })
				.then((response) => {

					$scope.cliente.id = response.data.id;

					$scope.cadastrarPedido();

				}, (error) => {
					alert(error.data.message);
				})
				.finally(() => loadingOff());

		}

	}
	
	$scope.cadastrarPedido = () => {

		$scope.pedido.id_tipo_pedido = TIPO_PEDIDO;

		$scope.pedido.id_cliente = $scope.cliente.id;

		loadingOn();
		$http({ method: 'POST', url: URL_API + 'pedido', data: $scope.pedido})
			.then((response) => {
				
				alert("Pedido cadastrado com sucesso. Número " + response.data.id);
				$scope.state = "update";
				$scope.pedido.id = response.data.id;
			
			}, (error) => {
				alert(error.data.message);
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
				alert(error.data.message);
			})
			.finally(() => loadingOff());

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
		$scope.getCliente();
		$scope.getPedidoBaixa();
	}


	$scope.cancel = () => {
		$scope.state = "search";
		$scope.buscaModal = {};
		$scope.buscaModalProduto = {};
		$scope.buscar();
	}

	$scope.buscar = () => {

		$scope.busca.id_tipo_pedido = TIPO_PEDIDO;

		loadingOn();
		$http({ method: 'POST', url: URL_API + 'pedido/busca', data: $scope.busca })
			.then(
				(response) => { 
					
					$scope.listaPedido = response.data 

					$scope.listaPedido.forEach(value => {
						value.data = moment(value.data).add(1, 'days').format('DD/MM/yyyy');
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
				alert(error.data.message);
			})
			.finally(() => loadingOff());
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
		$scope.buscaModalProduto.flg_distribuidora = true;

		if ($scope.buscaModalProduto.descricao.length > 2) {
			loadingOn();
			$http({ method: 'POST', url: URL_API + 'produto/busca', data: $scope.buscaModalProduto })
				.then((response) => {
					$scope.produtos = response.data;
				}, (error) => {
					alert(error.data.message);
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
					alert(error.data.message);
				})
				.finally(() => loadingOff());

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
				alert(error.data.message);
			})
			.finally(() => loadingOff());
	}



	//---------------------------------
	// Baixar
	//---------------------------------

	$scope.baixar = function () {

		$scope.pedidoBaixaForm.data = $('#data_baixado').val();
		if ($scope.isEmpty($scope.pedidoBaixaForm.nf)) {
			alert('Campo NF obrigatório!');
			return;
		}
		if ($scope.isEmpty($scope.pedidoBaixaForm.data)) {
			alert('Campo Data obrigatório!');
			return;
		}
		if ($scope.isEmpty($scope.pedidoBaixaForm.valor)) {
			alert('Campo Valor obrigatório!');
			return;
		}

		$scope.pedidoBaixaForm.id_pedido = $scope.pedido.id;

		loadingOn();

		$http({ method: 'POST', url: URL_API + 'pedidoBaixa/pedidoBaixaDistribuidora', data: $scope.pedidoBaixaForm })
			.then((response) => {
				$scope.getPedidoBaixa();
				alert('Pedido baixado com sucesso!');
				$scope.pedidoBaixaForm = {};
			}, (error) => {
				alert(error.data.message);
			})
			.finally(() => loadingOff());

	}

	$scope.getPedidoBaixa = () => {

		loadingOn();
		$http({ method: 'GET', url: URL_API + 'pedidoBaixa/' + $scope.pedido.id })
			.then(
				(response) => {
					$scope.pedidoBaixa = response.data;
					$scope.pedidoBaixa.data = moment($scope.pedidoBaixa.data).add(1, 'days').format('DD/MM/yyyy');
				},
				(error) => alert(error.data.message)
			)
			.finally(() => loadingOff());
	}

	$scope.excluirBaixa = () => {

		if (!confirm("Confirma exclusão?")) {
			return;
		}

		loadingOn();
		$http({ method: 'DELETE', url: URL_API + 'pedidoBaixa/' + $scope.pedido.id })
			.then((response) => {
				$scope.pedidoBaixa = {};
			}, (error) => {
				alert(error.data.message);
			})
			.finally(() => loadingOff());
	}


			
  }]);

  