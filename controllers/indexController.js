var indexController = {
   index: function(req, res) {
    return res.render('index');
 },
 searchResults: function(req, res) {
   return res.render('search-results');
},

};

module.exports = indexController; 

