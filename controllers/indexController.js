const db = require('../database/models')
const productos = db.Producto
const usuarios = db.Usuario
const op = db.Sequelize.Op;
//var productos = require('../db/productos');

var indexController = {
   index: function (req, res) {
     productos.findAll({
        order: [
           ['createdAt', 'DESC'],
        ]
     })
      .then(function(productos){
       console.log(productos);
            return res.render('index', {
               productos: productos
            })
      })
   },
   searchResults: function (req, res) {
      let search = req.query.id
      console.log(search);
      productos.findAll({
         where: [{
            nombre: {
               [op.like]: `%${search}%`
            }
         }, {
            descripcion: {
               [op.like]: `%${search}%`
            }
         }]
      }).then(function (unosProductos) {
         if (unosProductos.length > 0) {
            console.log(unosProductos);
            return res.render('search-results', {
               productos: unosProductos
            })
         } else {
            let message = "no lo pudimos encontrar"
            res.render("error" , {message: message})
         }
      })
   },
};

module.exports = indexController;