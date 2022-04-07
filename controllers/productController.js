var usuario = require('../db/usuario');
<<<<<<< HEAD
var productos= require('../db/productos');

var productController = {
    index: function (req, res) {
        res.render('product', {'usuario': usuario}, /*{'productos': productos }*/) ;
=======
var comentarios = require('../db/comentarios');

var productController = {
    index: function (req, res) {
<<<<<<< HEAD
        res.render('product', {'usuario': usuario})
    },
    productAdd: function (req, res) {
        res.render('product-add', {'usuario': usuario}, {'comentarios': comentarios} );
=======
        res.render('product', {'usuario': usuario}, {'productos': productos }) ;
>>>>>>> 65641be6da9abfdcc2423275e284432baa4996b5
    },
    productAdd: function (req, res) {
        res.render('product-add', {'usuario': usuario}) ;
>>>>>>> 361fec627997bc79faf630fd1f6685bdf7c3f6fa
    }
};

module.exports = productController;
