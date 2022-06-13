const db = require('../database/models')
const productos = db.Producto
const usuarios = db.Usuario
const comentarios = db.Comentario
//var usuario = require('../db/usuario');
//var productos = require('../db/productos');
//var comentarios = require('../db/comentarios');

var productController = {
    index: function (req, res) {
        let id = req.params.id
        
        let producto = {
        nombre: nombre,
        comentarios: comentarios,
        idProduct: req.params.id}

        res.render('product', {
        });
    },
    productAdd: function (req, res) {
        if(req.session.user == undefined){
            return res.redirect('/')
        } else {  
         return res.render('product-add');
         };
    },
    post: function(req, res){
        let product = {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            imagen: req.file.filename,
            usuarioId: req.session.user.id
        }

        productos.create(product)
        .then (function(respuesta){
            return res.redirect ('/')
        })
        .catch(error => console.log(error))
    },

    producto: function(req, res){
        let id = req.params.id
        productos.findOne({
            include: [{ association: "usuario"}],
            where: [{nombre: id}]
        }) 
        .then (function (elProducto){
        comentarios.findAll({
            include: [{ association: "usuario"}, { association: "producto"}]
        })
        .then(function(comentarios){
            console.log(elProducto);
            return res.render ('product' , {productos : elProducto, comentarios : comentarios})
        })
        })

    },
    delete: function(req, res){
        productos.destroy({
            where: {
                id : req.params.id
            }
        })
        .then (function(borrar){
            return res.redirect ('/')
        })
    },
    comentario: function (req, res) {
        let comentario = {
            comentario: req.body.comentario,
            usuarioId: req.session.user.id,
            productoId: req.params.id
        }
        comentarios.create(comentario)
        .then (function(respuesta){
            return res.redirect ('/')
        })
    }
    

}

    
// 
module.exports = productController;