var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController')

router.get('/product-add', productController.productAdd)

router.post('/product-add' , productController.post)

router.get('/:id?', productController.index);

// router.post('/:id?', productController.delete);

module.exports = router;