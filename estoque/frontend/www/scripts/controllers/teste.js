'use strict';

/**
 * @ngdoc function
 * @name isghApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the isghApp
 */
angular.module('admin').controller('TesteCtrl', ["$scope", "$http", "MeuService", function ($scope, $http, MeuService) {
	
	$scope.teste = MeuService.getMinhaVariavelGlobal();
	 

  
  
	 
	
		
  }]);
