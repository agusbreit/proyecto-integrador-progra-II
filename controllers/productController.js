var usuario = require('../db/usuario');

var productController = {
    index: function (req, res) {
        res.render('product')
    },
    productAdd: function (req, res) {
        res.render('product-add'), {'usuario': usuario} ;
    }
};

module.exports = productController;