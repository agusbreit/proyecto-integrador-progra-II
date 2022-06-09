const db = require('../database/models')
const productos = db.Producto
const usuarios = db.Usuario
const comentarios = db.Comentario
//var usuario = require('../db/usuario');
//var productos = require('../db/productos');
//var comentarios = require('../db/comentarios');

var productController = {
    index: function (req, res) {
        res.render('product', {
            // usuario: usuario,
            productos: productos,
            comentarios: comentarios,
            idProduct: req.params.id,
        });
    },
    productAdd: function (req, res) {
        res.render('product-add', {
            // usuario: usuario,
            comentarios: comentarios,
        });
    },
    post: function(req, res){
        let product = {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            imagen: req.body.imagen
        }

        productos.create(product)
        .then (function(respuesta){
            return res.redirect ('/product')
        })
        .catch(error => console.log(error))
    },

    // producto: function(req, res){
    //     let id = req.params.id
    //     productos.findByPk(id)
    //     .then (function (elProducto){
    //         return res.render ('')
    //     })
    // }
};

module.exports = productController;