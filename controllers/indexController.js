const {
   send
} = require('express/lib/response');
const db = require('../database/models')
const productos = db.Producto
const usuarios = db.Usuario
const op = db.Sequelize.Op;
//var productos = require('../db/productos');

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
            console.log(productos);
            return res.render('index', {
               productos: productos,
            })
         })

   },
   searchResults: function (req, res) {
      let search = req.query.search
      console.log(search);
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
<<<<<<< HEAD
            console.log(unosProductos);
            if (unosProductos != "") {
               console.log(unosProductos);
               return res.render('search-results', {
                  productos: unosProductos
               })
            } else {
               let message = "no lo pudimos encontrar"
               res.render('search-results') , {
               message: message
            }}})
      }
   }

=======
        // console.log(unosProductos);
        // if (unosProductos != "") {
          //  console.log(unosProductos);
            return res.render('search-results', {
               productos: unosProductos
            })
         //} else {
            //let message = "no lo pudimos encontrar"
          //  res.render('search-results')//, {
             //  message: message
           // })
       // }
      })
   },
};
>>>>>>> 1d1efd695066ec84fae9ebbc8eb79cd104252e39

module.exports = indexController;