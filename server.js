var express = require('express'),
	app = express(),
	http = require('http'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
    methodOverride = require('method-override');
	path = require("path");

//Connect the db with the url provided 
try {
    mongoose.connect('mongodb://127.0.0.1:27017/ticketApp', {useNewUrlParser: true})
} catch (err) {
    mongoose.createConnection('mongodb://127.0.0.1:27017/ticketApp', {useNewUrlParser: true})
}
mongoose.connection.once('open', function(){
	console.log('MongoDB Running. Successfully connected to the database')
})
	
// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

// Import Models and controllers
var models = require('./models/itemModel');
var itemModelCtrl = require('./controllers/itemModel-ctrl');


// Example Route
var router = express.Router();
router.get('/', function(req, res) {
  //res.send("<h1>Hello world!</h1>");
  //res.sendFile(path.join(__dirname+'/index.html'));
  res.sendFile(path.join(__dirname+'/FRONT/index.html'));
});
app.use(router);
app.use(express.static(__dirname + '/FRONT'));

// API routes
var items = express.Router();

items.route('/categories')
  .get(itemModelCtrl.findAllCategories)
  
items.route('/items')
  .get(itemModelCtrl.findAllItems)
  .post(itemModelCtrl.addItems);

items.route('/items/:id')
  .put(itemModelCtrl.updateItem)
  .delete(itemModelCtrl.deleteItem);

items.route('/prices/:item')
	.get(itemModelCtrl.getPrice)

items.route('/supermarkets')
	.get(itemModelCtrl.findAllSupermarkets)

app.use('/api', items);

// Start server
app.listen(3000, function() {
    console.log('Server started at http://localhost:3000');    
});
	
