'use strict';

/**
 * @ngdoc overview
 * @name isghApp
 * @description
 * # isghApp
 *
 * Main module of the application.
 */
angular.module('admin', ['textAngular']);
  
  


//-------------------------------
// INTERCEPTOR
//-------------------------------


// angular.module('admin').run(function ($http) {
// 	$http.defaults.headers.common.Authorization = 'Basic YmVlcDpib29w';
// });

angular.module('admin', []).factory('Interceptor', Interceptor);

Interceptor.$inject = ['$q'];

function Interceptor($q) {
	return {
		request: function (config) {
			config.headers['Authorization'] = "Bearer "+MS_TOKEN;
			//alert('antes');
			return config;
		},
		response: function (response) {
			//alert('depois');
			return response || $q.when(response);
		},
		responseError: function (error) {
			if (error.status === 401 || error.status === 403) {
				//faz alguma coisa.
			}
			return $q.reject(error);
		}
	};
}


angular.module('admin').config(['$httpProvider', Interceptor2]);

function Interceptor2($httpProvider) {
	$httpProvider.interceptors.push('Interceptor');
}


//-------------------------------


var loadingOn = function() {
	$('.cobre').css('display', 'block');
}

var loadingOff = function() {
	$('.cobre').css('display', 'none');
}

angular.element(document).ready(function () {
    $('body').css('display', 'block');
});



//----------------------------------------------------------------
//DIRETIVA ATIVADA QUANDO FOR PRESSIONADO O ENTER - (ng-enter)
//-----------------------------------------------------------------


angular.module('admin').directive('ngEnter', function () {
	return function (scope, element, attrs) {
		element.bind("keydown keypress", function (event) {
			if (event.which === 13) {
				scope.$apply(function () {
					scope.$eval(attrs.ngEnter, { 'event': event });
				});

				event.preventDefault();
			}
		});
	};
});
