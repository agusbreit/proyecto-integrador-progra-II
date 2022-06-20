const {
   send
} = require('express/lib/response');
const db = require('../database/models')
const productos = db.Producto
const usuarios = db.Usuario
const op = db.Sequelize.Op;

var indexController = {
   index: function (req, res) {
      productos.findAll({
            include: [{
               association: 'usuario'
            }, {
               association: 'comentario'
            }],
            order: [
               ['createdAt', 'ASC']
            ]
         })
         .then(function (productos) {
            return res.render('index', {
               productos: productos,
            })
         })

   },
   searchResults: function (req, res) {
      let search = req.query.search
      productos.findAll({
         include: [{
            association: 'usuario'
         }, {
            association: 'comentario'
         }],
         where: {
            [op.or]: [{
                  nombre: {
                     [op.like]: `%${search}%`
                  }
               },
               {
                  descripcion: {
                     [op.like]: `%${search}%`
                  }
               }
            ]
         }
      }).then(function (unosProductos) {
            return res.render('search-results', {
               productos: unosProductos
            })
      })
   },
};

module.exports = indexController;