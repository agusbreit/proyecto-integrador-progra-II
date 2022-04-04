var productController = {
    index: function(req,res){
        return res.send('esto es el product')
    },
    productAdd: function(req, res) {
        return res.render('product-add');
     }
};

module.exports = productController; 