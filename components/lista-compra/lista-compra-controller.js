(function () {
    'use strict';

    angular.module('inicio')
	.controller('listaCompraController', listaCompraController);
	
	listaCompraController.$inject = ['$scope', '$http'];
	
	function listaCompraController($scope, $http){
		var vm = this;
		vm.model = {
			data: {
				item: {}
			}
		};
		vm.initmodel = initmodel;
		vm.addNuevo = addNuevo;
		vm.getCategories = getCategories;
		vm.addCategory = addCategory;
		vm.editItemBD = editItemBD;
		vm.bestSuper = bestSuper;
		
		vm.initmodel();
		
		
		function initmodel() {
			vm.gridOptions2 = {
				enableSorting: true,
				columnDefs: [{
					field: 'item',
					name: 'Item'
				}, {
					field: 'amount',
					name: 'Amount'
				}, {
					field: 'category',
					name: 'Category'
				}],
				data: []
			};
			vm.getCategories();
			vm.model.config = {
				newCategoryDis: true,
				editDis: true
			}
		}
		
		function addCategory(state){
			vm.model.config.newCategoryDis = !vm.model.config.newCategoryDis;
			if (state === 'confirm'){
				if (vm.model.data.newCategory) {	
					vm.model.data.category = vm.model.data.newCategory;
					vm.model.data.categories.push(vm.model.data.newCategory);
					vm.model.data.newCategory = '';
				}
			}
		}
		
		function getCategories() {
			$http.get('/api/categories').then(function successCallback(response) {
				console.log('Obteniendo todos las categorias..');
				console.log(response);
				vm.model.data.categories = JSON.parse(JSON.stringify(response.data));
				//.copy(response.data, vm.model.data.categories);
			}, function errorCallback(err) {
				console.log(err);
			});
		}
		
		function addNuevo() {
			console.log('Añadiendo nuevo item..');
			var nuevo = vm.model.data.item;
			vm.gridOptions2.data.push(nuevo);
			vm.model.data.item = {};
			/*$http.post('/api/items', nuevo).then(function successCallback(response) {
				console.log('Se ha añadido un nuevo item');
				$http.get('/api/items').then(function successCallback(response) {
					console.log(response);
					vm.model.data.item = {};	
					angular.copy(response.data, vm.gridOptions.data);
				}, function errorCallback(err) {
					console.log(err);
				});
			}, function errorCallback(err) {
			});*/
		}
		
		function editItem(item){
			angular.copy(item, vm.model.data.item);
			vm.model.config.editDis = false;
		}
		
		function editItemBD() {
			var item = vm.model.data.item;
			var url = '/api/items/' + item._id;
			console.log(url);
			$http.put(url, item).then(function successCallback(response) {
				console.log('Actualizando el item..');
				vm.refresh();
			}, function errorCallback(err) {
				console.log(err);
			});
		}
		
		function removeItem(item){
			var url = '/api/items/' + item._id;
			$http.delete(url).then(function successCallback(response) {
				console.log('Eliminando el item..');
				vm.refresh();
			}, function errorCallback(err) {
				console.log(err);
			});
		}
		
		function bestSuper() {
			vm.gridOptions2.data.forEach(function (elem){
				$http.get('/api/supers/').then(function successCallback(response) {
					console.log(response);
					vm.model.data.supers = JSON.parse(JSON.stringify(response.data));
				}, function errorCallback(err) {
					console.log(err);
				});
				/*var url = '/api/prices/' + vm.model.data.item.item;
				console.log(url);
				$http.get(url).then(function successCallback(response) {
					console.log(response);
					vm.model.data.bestSuper = "El mejor super para esta lista de la compra es " + response.data[0].supermarket;
				}, function errorCallback(err) {
					console.log(err);
				});*/
			}) 
		}
		
		function refresh() {
			vm.getCategories();
			vm.model.data.item = {};
			vm.model.config.editDis = true;
		}
	}
        
}());
