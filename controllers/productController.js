var usuario = require('../db/usuario');
var productos= require('../db/productos');
var comentarios = require('../db/comentar  m,mios');

var productController = {
    index: function (req, res) {
        res.render('product', {'usuario': usuario, 'productos': productos, 'comentarios': comentarios }) },

    productAdd: function (req, res) {
        res.render('product-add', {'usuario': usuario, 'comentarios': comentarios });
    },
    productAdd: function (req, res) {
        res.render('product-add', {'usuario': usuario}) ;
    }
};

module.exports = productController;
