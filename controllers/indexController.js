var productos = require('../db/productos');

var indexController = {
   index: function (req, res) {
<<<<<<< HEAD
      res.render('index', {
         'productos': productos
      });
   },
   searchResults: function (req, res) {
      res.render('search-results', {
         'productos': productos
      });
=======
      res.render('index', {productos: productos });
   },
   searchResults: function (req, res) {
      res.render('search-results', {productos: productos });
>>>>>>> 52f0493aba6a5805acef61af530dfd1d7220aee4
   },

};

module.exports = indexController;