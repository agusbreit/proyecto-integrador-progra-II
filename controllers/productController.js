const db = require('../database/models')
const productos = db.Producto
const usuarios = db.Usuario
const comentarios = db.Comentario
const bcrypt = require('bcryptjs');
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
            include: [{ association: "usuario"}, { association: "producto"}],
            where: [{productoId: elProducto.id}]
        })
        .then(function(comentarios){
            console.log(comentarios)
            return res.render ('product' , {productos : elProducto, comentarios : comentarios})
        })
        })
        .catch(error => console.log(error))
        .catch(error => console.log(error))

    },
    delete: function(req, res){
        productos.destroy({ where: [{
            id : req.params.id }]
        })
        .then (function(borrar){
            console.log(borrar)
            return res.redirect ('/')
        })
    },
    comentario: function (req, res) {
        if(req.session.user == undefined){
            return res.redirect('/users/login')
        } else { 
            let comentario = {
                comentario: req.body.comentario,
                usuarioId: req.session.user.id,
                productoId: req.params.id
            }
            comentarios.create(comentario)
            .then (function(respuesta){
                return res.redirect ("/")
            })
        };
    },
    edit: function(req, res){
        if(req.session.user == undefined){
            return res.redirect('/')
        } else { 
            productos.findOne({
                where: [{id: req.params.id}]
            })
            .then (function(elProducto){
                return res.render('edit' , {productos: elProducto});
            })
            
        };
    },

    // edit: function(req, res) {
    //     const id = req.params.id;
    //     if(req.session.user){
    //         productos.findByPk(id)
    //             .then(productos=>{
    //                 if(req.session.user.usuarioId == productos.usuarioId){
    //                     return res.render("edit", {productos: productos}); 
    //                 }else{
    //                     return res.redirect("/")
    //                 }
    //             })
    //             .catch(error => {
    //                 console.log(error)
    //             })
    //     }else{
    //         return res.redirect("/users/login")
    //     }
    // },

    edited: function(req, res){
    
         let product = {
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                //imagen: req.file.filename,
                usuarioId: req.session.user.id
            }
        productos.update(product, {
            where: [{id: req.params.id}]
        })
        .then (function(respuesta){
            productos.findByPk(req.params.id)
            .then(function(producto){
                return res.redirect (`/product/${producto.nombre}`)
            })
            .catch(error => console.log(error))
           
        })
        .catch(error => console.log(error))
    },
    

}
module.exports = productController;