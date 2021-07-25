'use strict';

/**
 * @ngdoc overview
 * @name isghApp
 * @description
 * # isghApp
 *
 * Main module of the application.
 */
angular
  .module('admin', [
	'textAngular'
  ]);
  
var loadingOn = function() {
	$('.cobre').css('display', 'block');
}

var loadingOff = function() {
	$('.cobre').css('display', 'none');
}

angular.element(document).ready(function () {
    $('body').css('display', 'block');
    
    //var host = angular.element('[ng-controller="TesteCtrl"]').scope().teste;
	//var pagina = window.location.href.replace(host,"").replace(".php","");
	
	//var menus = pagina.split("-");
	//$('#menu'+menus[0]).attr("class","active");
	//$('#menu'+menus[1]).attr("class","active");
	
});