(function () {
    'use strict';

    angular.module('myNuevaApp', ['ui.router', 'inicio', 'lista.compra', 'ui.grid', 'ui.grid.moveColumns', 'ui.grid.resizeColumns'])
        .config(function ($urlRouterProvider, $stateProvider) {
			$urlRouterProvider.otherwise('/home');

			$stateProvider
				// HOME STATES AND NESTED VIEWS 
				.state('home', {
					url: '/home',
					templateUrl: './app/components/inicio/inicio-tpl.html',
					controller: 'inicioController as vm'
				})
				.state('listaCompra', {
					url: '/listaCompra',
					templateUrl: './app/components/lista-compra/lista-compra-tpl.html',
					controller: 'listaCompraController as vm'
				});
        })
    //.run(function ($log, $location) {
    //    $log.debug('App run');
    //    $location.path('/national-cheques/launcher');
    //});
}());
