(function () {
    'use strict';

    angular.module('myNuevaApp', ['ui.router', 'inicio', 'ui.grid', 'ui.grid.moveColumns', 'ui.grid.resizeColumns'])
        .config(function ($urlRouterProvider, $stateProvider) {
			$urlRouterProvider.otherwise('/home');

			$stateProvider
				// HOME STATES AND NESTED VIEWS 
				.state('home', {
					url: '/home',
					templateUrl: './app/components/inicio/inicio-tpl.html',
					controller: 'inicioController as vm'
				});
        })
    //.run(function ($log, $location) {
    //    $log.debug('App run');
    //    $location.path('/national-cheques/launcher');
    //});
}());
