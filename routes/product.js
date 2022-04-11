var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController')

router.get('/product-add', productController.productAdd)

router.get('/:id?', productController.index);

module.exports = router;