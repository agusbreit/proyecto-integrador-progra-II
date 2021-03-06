const db = require('../database/models')
const productos = db.Producto
const usuarios = db.Usuario
const comentarios = db.Comentario
const bcrypt = require('bcryptjs');

var productController = {
    index: function (req, res) {
        let id = req.params.id

        let producto = {
            nombre: nombre,
            comentarios: comentarios,
            idProduct: req.params.id
        }
        res.render('product', {});
    },
    productAdd: function (req, res) {
        if (req.session.user == undefined) {
            return res.redirect('/')
        } else {
            return res.render('product-add');
        };
    },
    post: function (req, res) {
        let product = {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            imagen: req.file.filename,
            usuarioId: req.session.user.id
        }
        productos.create(product)
            .then(function (respuesta) {
                return res.redirect('/')
            })
            .catch(error => console.log(error))
    },

    producto: function (req, res) {
        let id = req.params.id
        productos.findOne({
                include: [{
                    association: "usuario"
                }],
                where: [{
                    nombre: id
                }]
            })
            .then(function (elProducto) {
                comentarios.findAll( {
                        include: [{
                            association: "usuario"
                        }, {
                            association: "producto"
                        }],
                        where: [{
                            productoId: elProducto.id
                        }],
                            order: [[['id', 'DESC']]]
                    
                    })
                    .then(function (comentarios) {
                        return res.render('product', {
                            productos: elProducto,
                            comentarios: comentarios
                        })
                    })
                    .catch(error => console.log(error))
            })
            .catch(error => console.log(error))
    },
    delete: function(req, res){
       if (req.session.user == undefined) {
        return res.redirect('/')
     } else {
        productos.findByPk(req.params.id)
        .then(function(producto){
            if(producto.usuarioId == req.session.user.id){
                productos.destroy({ 
                    where: {id : req.params.id }
                })
                .then (function(borrar){
                    comentarios.destroy({
                        where: {productoId : req.params.id}
                    })
                    .then(function(borrado){
                        return res.redirect ('/')
                    })
                    .catch(error => console.log(error))
                })
                .catch(error => console.log(error))
            } else {
                return res.redirect('/')
            }
        })
    }
    },
    comentario: function (req, res) {
        if (req.session.user == undefined) {
            return res.redirect('/users/login')
        } else {
            let comentario = {
                comentario: req.body.comentario,
                usuarioId: req.session.user.id,
                productoId: req.params.id
            }
            comentarios.create(comentario)
            .then (function(respuesta){
                productos.findByPk(req.params.id)
                .then (function(producto){
                    return res.redirect (`/product/${producto.nombre}`)
                })
                .catch(error => console.log(error))
            })
            .catch(error => console.log(error))
        };
    },
    edit: function(req, res){
        if (req.session.user == undefined) {
            return res.redirect('/')
        } else {
            productos.findByPk(req.params.id)
            .then(function(producto){
                if(producto.usuarioId == req.session.user.id){
                    productos.findOne({
                        where: [{id: req.params.id}]
                    })
                    .then (function(elProducto){
                        return res.render('edit' , {productos: elProducto});
                    })
                    .catch(error => console.log(error))
                } else {
                    return res.redirect('/')
                }
            })
            .catch(error => console.log(error))
        }
    },
    edited: function(req, res){
    
         let product = {
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                imagen: req.file.filename,
                usuarioId: req.session.user.id
            }
        productos.update(product, {
                where: [{
                    id: req.params.id
                }]
            })
            .then(function (respuesta) {
                productos.findByPk(req.params.id)
                    .then(function (producto) {
                        return res.redirect(`/product/${producto.nombre}`)
                    })
                    .catch(error => console.log(error))
            })
            .catch(error => console.log(error))
    },
    
}
module.exports = productController;