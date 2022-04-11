var productos = require('../db/productos');

var indexController = {
   index: function (req, res) {
      res.render('index', {productos: productos });
   },
   searchResults: function (req, res) {
      res.render('search-results', {productos: productos });
   },

};

module.exports = indexController;