var usuario = require('../db/usuario');
var comentarios = require('../db/comentarios');

var productController = {
    index: function (req, res) {
        res.render('product', {'usuario': usuario})
    },
    productAdd: function (req, res) {
        res.render('product-add', {'usuario': usuario}, {'comentarios': comentarios} );
    }
};

module.exports = productController;
