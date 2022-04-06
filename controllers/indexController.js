var indexController = {
   index: function (req, res) {
      res.render('index');
   },
   searchResults: function (req, res) {
      res.render('search-results');
   },

};

module.exports = indexController;