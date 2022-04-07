var usuario = require('../db/usuario');

var productController = {
    index: function (req, res) {
        res.render('product', {'usuario': usuario}, {'productos': productos }) ;
    },
    productAdd: function (req, res) {
        res.render('product-add', {'usuario': usuario}) ;
    }
};

module.exports = productController;