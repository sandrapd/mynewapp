var mongoose = require('mongoose');
var itemModel  = mongoose.model('itemModel');

//GET - Return all itemModels in the DB
exports.findAllItems = function(req, res) {
	itemModel.find(function(err, itemModels) {
		if(err) res.send(500, err.message);

		console.log('GET /items')
			res.status(200).jsonp(itemModels);
		}).select("-__v");
};

//GET - Return all Categories in the DB
exports.findAllCategories = function(req, res) {
	itemModel.find().distinct('category',function(err, categories) {
		if(err) res.send(500, err.message);

		console.log('GET /categories')
			res.status(200).jsonp(categories);
		});
};

//POST - Insert a new itemModel in the DB
exports.addItems = function(req, res) {
	var item = new itemModel({
		item: req.body.item,
		amount: req.body.amount,
		category: req.body.category,
		price: req.body.price,
		supermarket: req.body.supermarket
	});

	item.save(function(err, item) {
		if(err) return res.send(500, err.message);
		res.status(200).jsonp(item);
		});
};

//PUT - Update a register already exists
exports.updateItem = function(req, res) {
	itemModel.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, newItem) {
		if(err) return res.status(500).send(err.message);
		console.log('PUT /item/' + req.params.id);
			res.status(200).jsonp(newItem);
		});
};

//DELETE - Delete an item with specified ID
exports.deleteItem = function(req, res) {
	itemModel.findByIdAndRemove(req.params.id, function(err, item) {
		if(err) return res.status(500).send(err.message);
		console.log('DELETE /item/' + req.params.id);
			res.status(200).send("Deleted");
		});
};

//GET - Get prices by item
exports.getPrice = function(req, res) {
	console.log(req.params.item);
	var param = {'item': req.params.item};
	itemModel.find(param, function(err, info) {
		console.log(info);
		if(err) return res.status(500).send(err.message);
		console.log('GET /item/' + req.params.item);
			res.status(200).jsonp(info);
		}).limit(1).sort('price');
};

//GET - Return all Supermarkets in the DB
exports.findAllSupermarkets = function(req, res) {
	itemModel.find().distinct('supermarket',function(err, supermarket) {
		if(err) res.send(500, err.message);

		console.log('GET /supermaket')
			res.status(200).jsonp(supermarket);
		});
};