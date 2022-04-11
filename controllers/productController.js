var usuario = require('../db/usuario');
var productos = require('../db/productos');
var comentarios = require('../db/comentarios');

var productController = {
    index: function (req, res) {
        res.render('product', {
            usuario: usuario,
            productos: productos,
            comentarios: comentarios,
            idProduct: req.params.id
        });

    },

    productAdd: function (req, res) {
<<<<<<< HEAD
        res.render('product-add', {
            'usuario': usuario,
            'comentarios': comentarios
        });
=======
        res.render('product-add', {usuario: usuario, comentarios: comentarios });
>>>>>>> 52f0493aba6a5805acef61af530dfd1d7220aee4
    }
};

module.exports = productController;