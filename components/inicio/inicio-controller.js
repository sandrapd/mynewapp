(function () {
    'use strict';

    angular.module('inicio')
	.controller('inicioController', inicioController);
	
	inicioController.$inject = ['$scope', '$http', '$state'];
	
	function inicioController($scope, $http, $state){
		var vm = this;
		vm.model = {
			data: {
				item: {}
			}
		};
		vm.initmodel = initmodel;
		vm.getInfo = getInfo;
		vm.addNuevo = addNuevo;
		vm.getCategories = getCategories;
		vm.addCategory = addCategory;
		vm.editItemBD = editItemBD;
		vm.refresh = refresh;
		vm.goListaCompra = goListaCompra;
		
		vm.initmodel();
		
		
		function initmodel() {
			vm.gridOptions = {
				enableSorting: true,
				columnDefs: [{
					field: 'id',
					visible: false
				}, {
					field: 'item',
					name: 'Item'
				}, {
					field: 'amount',
					name: 'Amount'
				}, {
					field: 'price',
					name: 'Price',
					cellFilter: 'currency:"€"'
				}, {
					field: 'priceunit',
					name: 'Unit Price',
					cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid">{{ row.entity.price / row.entity.amount | currency:"€"}}</div>'
				}, {
					field: 'category',
					name: 'Category'
				}, {
					field: 'supermarket',
					name: 'Supermarket'
				}, {
					field: 'options',
					cellTemplate: '<div class="btn-group"><button class="btn btn-outline-info btn-sm" style="border:none" type="button" ng-click="row.entity.editItem(row.entity)"><i class="fas fa-pencil-alt"></i></button><button class="btn btn-outline-danger btn-sm" style="border:none" type="button" ng-click="row.entity.removeItem(row.entity)"><i class="fas fa-trash"></i></button></div>'
				}],
				data: []
			};
			vm.gridOptions2 = {
				enableSorting: true,
				columnDefs: [{
					field: 'item',
					name: 'Item'
				}, {
					field: 'amount',
					name: 'Amount'
				}, {
					field: 'price',
					name: 'Price',
					cellFilter: 'currency:"€"'
				}, {
					field: 'category',
					name: 'Category'
				},{
					field: 'supermarket',
					name: 'Supermarket'
				}],
				data: []
			};
			vm.getInfo();
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
		function getInfo() {
			$http.get('/api/items').then(function successCallback(response) {
				console.log('Obteniendo todos los items..');
				console.log(response);
				//vm.model.data = JSON.parse(JSON.stringify(response.data));
				angular.copy(response.data, vm.gridOptions.data);
				vm.gridOptions.data.forEach(function (element){
					element.editItem = editItem;
					element.removeItem = removeItem;
				});
			}, function errorCallback(err) {
				console.log(err);
			});
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
			$http.post('/api/items', nuevo).then(function successCallback(response) {
				console.log('Se ha añadido un nuevo item');
				$http.get('/api/items').then(function successCallback(response) {
					console.log(response);
					vm.model.data.item = {};	
					angular.copy(response.data, vm.gridOptions.data);
				}, function errorCallback(err) {
					console.log(err);
				});
			}, function errorCallback(err) {
				//console.log(err);
			});
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
		
		function refresh() {
			vm.getInfo();
			vm.getCategories();
			vm.model.data.item = {};
			vm.model.config.editDis = true;
		}
		
		function goListaCompra(){
			console.log("vamos");
			$state.go('listaCompra');
		}
	}
        
}());
