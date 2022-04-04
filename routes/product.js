var express = require('express');
var router = express.Router();
const productController = require ('../controllers/productController')

router.get('/', productController.index);

//AGREGAR UNO QUE SEA CON SUFIJO OPTATIVO COMO /SUGUS

router.get('/product-add', productController.productAdd)

module.exports = router;