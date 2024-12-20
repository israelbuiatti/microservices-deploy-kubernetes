'use strict';

angular.module('admin').controller('PedidoCtrl', ["$scope", "$http", function ($scope, $http) {

	this.$onInit = () => {
		$scope.cancel();
		$scope.reset();
		$scope.getListaFornecedor();
		$scope.getListaVendedor();
		$scope.getListaVendedorTelemarketing();
		$scope.buscar();
		$scope.getCidades();
	}

	$scope.reset = () => {
		$scope.busca = {};
		$scope.pedido = {};
		$scope.pedido.pedido = ID;
		$scope.fornecedor = {};
		$scope.baixa = {};
		$scope.pItem = {};
		$scope.pedidoBaixa = {};
		$scope.pedidoCobranca = {};
		$scope.produto = {};
		$scope.cliente = {};
		$scope.itens = [];
		$scope.pedidoItem = false;
		$scope.valor_total = 0.0;
		$('#datetimepicker4').val('');
	}

	$scope.getCidades = () => {

		loadingOn();
		$http({ method: 'GET', url: URL_API + 'cidade/' })
			.then(
				(response) => $scope.listaCidades = response.data,
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

	$scope.getListaVendedor = () => {

		const filtro = {
			flg_vend_d: false,
			flg_sup_d: false
		}

		loadingOn();
		$http({ method: 'POST', url: URL_API + 'vendedor/busca', data: filtro })
			.then(
				(response) => {
					$scope.listaVendedor = response.data;
				},
				(error) => alert(error.data.message)
			)
			.finally(() => loadingOff());
	}

	$scope.getListaVendedorTelemarketing = () => {

		const filtro = {
			flg_telemarketing: true
		}

		loadingOn();
		$http({ method: 'POST', url: URL_API + 'vendedor/busca', data: filtro })
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
		if ($scope.isEmpty($scope.pedido.id_vendedor) && $scope.userAccess.admin) {
			alert('Campo vendedor obrigatório!');
			return false;
		}

		return true;

	}
	
	$scope.cadastrar = function() {

		$scope.pedido.data = $('#pedido_data').val();
		
		if (!validar()) return false;

		$scope.pedido.id_tipo_pedido = TIPO_PEDIDO;

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
	
	 
	$scope.carregaFornecedor = () => {
		$http({method: 'GET',url: URL_API + 'fornecedor/'+$scope.pedido.id_fornecedor})
			.then((response) => {
				$scope.fornecedor = response.data;
				
				//$scope.fornecedor.comissao_vend = ($scope.fornecedor.comissao_vend*100)+'%';
				
			}, (error) => {
				alert(error.data.message);
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
		$scope.getPedidoBaixa();
		//$scope.getListaPedidoCobranca();
		$scope.carregaFornecedor();
		$scope.pedidoBaixaForm = {};
		$scope.pedidoCobrancaForm = {};
	}


	$scope.cancel = () => {
		$scope.state = "search";
		$scope.buscaModal = {};
		$scope.buscaModalProduto = {};
	}

	$scope.buscar = () => {

		$scope.busca.id_tipo_pedido = TIPO_PEDIDO;

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
				alert(error.data.message);
			})
			.finally(() => loadingOff());
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
			//console.log('item', item);
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

		$http({ method: 'POST', url: URL_API + 'pedidoBaixa/', data: $scope.pedidoBaixaForm })
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
					$scope.pedidoBaixa.data = moment($scope.pedidoBaixa.data).format('DD/MM/yyyy');
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



	//---------------------------------
	// Cobrança
	//---------------------------------

	$scope.salvarCobranca = function () {

		$scope.pedidoCobrancaForm.data = $('#data_cobranca').val();

		if ($scope.isEmpty($scope.pedidoCobrancaForm.data)) {
			alert('Campo Data obrigatório!');
			return;
		}
		if ($scope.isEmpty($scope.pedidoCobrancaForm.valor)) {
			alert('Campo Valor obrigatório!');
			return;
		}

		$scope.pedidoCobrancaForm.id_pedido = $scope.pedido.id;

		loadingOn();

		$http({ method: 'POST', url: URL_API + 'pedidoCobranca/', data: $scope.pedidoCobrancaForm })
			.then((response) => {
				$scope.getListaPedidoCobranca();
				alert('Cobrança cadastrada com sucesso!');
				$scope.pedidoCobrancaForm = {};
			}, (error) => {
				alert(error.data.message);
			})
			.finally(() => loadingOff());

	}

	$scope.getListaPedidoCobranca = () => {

		loadingOn();
		$http({ method: 'GET', url: URL_API + 'pedidoCobranca/' + $scope.pedido.id })
			.then(
				(response) => {
					$scope.listaPedidoCobranca = response.data;

					$scope.listaPedidoCobranca.forEach(value => {
						value.data = moment(value.data).format('DD/MM/yyyy');
					})
				},
				(error) => alert(error.data.message)
			)
			.finally(() => loadingOff());
	}

	$scope.excluirCobranca = (item) => {

		if (!confirm("Confirma exclusão?")) {
			return;
		}

		loadingOn();
		$http({ method: 'DELETE', url: URL_API + 'pedidoCobranca/' + item.id })
			.then((response) => {
				$scope.getListaPedidoCobranca();
			}, (error) => {
				alert(error.data.message);
			})
			.finally(() => loadingOff());
	}

	$scope.imprimir = (item) => {
		window.open(URL_BASE + "/pages/pedido/imprimir.php?id_pedido=" + item.id + "&token=" + MS_TOKEN, 'name', 'height=500,width=900');
	}

	$scope.changeData1 = () => {
		$scope.busca.data_inicio = $('#data_inicio').val();
	}

	$scope.changeData2 = () => {
		$scope.busca.data_fim = $('#data_fim').val();
	}

			
  }]);

  