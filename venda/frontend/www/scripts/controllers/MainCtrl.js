'use strict';

angular.module('admin').controller('MainController', ["$scope", "$http", function ($scope, $http) {

	this.$onInit = () => {
		$scope.getUserAccess();
	}
	$scope.isEmpty = (param) => {
		if (param == undefined || param == '') {
			return true;
		}
		return false;
	}

	$scope.getUserAccess = () => {

		loadingOn();
		$http({ method: 'POST', url: URL_API + 'vendedor/getAccess' })
			.then(
				(response) => $scope.userAccess = response.data,
				(error) => console.log(error.data.message)
			)
			.finally(() => loadingOff());

	}
	

}]);


