'use strict';

angular.module('admin').controller('ClienteCtrl', ["$scope", "$http", function ($scope, $http) {

	this.$onInit = () => {
		$scope.cancel();
		$scope.getEstados();
		$scope.getCidades(); //removar ao refatorar pra pegar cidade/estado do microserviço
		$scope.getListaRegiao();
		$scope.buscar();
	}


	//---------------

	$scope.getEstados = () => {

		loadingOn();
		$http({ method: 'GET', url: URL_API_CONSULTA_CEP + 'estado'})
			.then(
				(response) => $scope.listaEstados = response.data,
				(error) => alert(error.data.message)
			)
			.finally(() => loadingOff());

	}
	

	// $scope.getCidades = (id) => {

	// 	if (!id) return;

	// 	loadingOn();
	// 	$http({ method: 'GET', url: URL_API_CONSULTA_CEP + 'cidade/' + id })
	// 		.then(
	// 			(response) => $scope.listaCidades = response.data,
	// 			(error) => alert(error.data.message)
	// 		)
	// 		.finally(() => loadingOff());

	// }

	$scope.getCidades = () => {

		loadingOn();
		$http({ method: 'GET', url: URL_API + 'cidade/'})
			.then(
				(response) => $scope.listaCidades = response.data,
				(error) => alert(error.data.message)
			)
			.finally(() => loadingOff());

	}

	$scope.changeEstado = () => {
		$scope.getCidades($scope.cliente.id_estado);
	}

	//---------------
	
	$scope.cancel = () => {
		$scope.state = "search";
		$scope.cliente = {};
		//$scope.busca = {};

	}

	$scope.preparaCadastrar = () => {
		$scope.state = "insert";

	}

	$scope.preparaAlterar = (item) => {
		$scope.state = "update";
		$scope.cliente = angular.copy(item);
		$scope.changeEstado();
		
	}

	const validar = () => {

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
		if ($scope.isEmpty($scope.cliente.cnpj)) {
			alert('Campo CNPJ obrigatório!');
			return false;
		}

		if (!validaCpfCnpj($scope.cliente.cnpj)) {
			alert('CPF/Cnpj Inválido!');
			return false;
		}

		return true;

	}
	
	$scope.cadastrar = () => {

		if(!validar()) return false;
		
		loadingOn();
		$http({method: 'POST',url: URL_API+'cliente',data: $scope.cliente})
			.then((response) => {
				
				alert("Cliente cadastrado com sucesso. Número " + response.data.id);
				$scope.listaClientes.push(response.data);
				$scope.cancel();
				
				
			}, (error) => alert(error.data.message))
			.finally(() => loadingOff());
		
	}

	$scope.alterar = () => {

		if (!validar()) return false;

		loadingOn();
		$http({ method: 'PUT', url: URL_API + 'cliente/' + $scope.cliente.id, data: $scope.cliente })
			.then((response) => {

				alert("Cliente alterado com sucesso.");
				$scope.cancel();
				$scope.buscar();


			}, (error) => alert(error.data.message))
			.finally(() => loadingOff());

	}

	$scope.excluir = (item) => {

		if (!confirm("Confirmar exclusão?")) return;

		loadingOn();
		$http({ method: 'DELETE', url: URL_API + 'cliente/' + item.id})
			.then((response) => {

				alert("Cliente excluido com sucesso.");
				$scope.cancel();
				$scope.buscar();


			}, (error) => alert(error.data.message))
			.finally(() => loadingOff());

	}

	$scope.buscar = () => {

		loadingOn();
		$http({ method: 'POST', url: URL_API + 'cliente/busca', data: $scope.busca })
			.then(
				(response) => $scope.listaClientes = response.data,
				(error) => alert(error.data.message)
			)
			.finally(() => loadingOff());

	}

	$scope.getListaRegiao = () => {

		loadingOn();
		$http({ method: 'GET', url: URL_API + 'regiao/' })
			.then(
				(response) => $scope.listaRegiao = response.data,
				(error) => alert(error.data.message)
			)
			.finally(() => loadingOff());

	}
	 
			
  }]);

  