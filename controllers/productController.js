var usuario = require('../db/usuario');
var productos= require('../db/productos');
var comentarios = require('../db/comentarios');

var productController = {
    index: function (req, res) {
        res.render('product', {'usuario': usuario, 'productos': productos }) },

    productAdd: function (req, res) {
        res.render('product-add', {'usuario': usuario, 'comentarios': comentarios });
    },
    productAdd: function (req, res) {
        res.render('product-add', {'usuario': usuario}) ;
    }
};

module.exports = productController;
