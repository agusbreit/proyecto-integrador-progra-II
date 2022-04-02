var express = require('express');
var router = express.Router();
const productController = require ('../controllers/productController')

router.get('/', productController/*.FALTA EL METODO QUE QUIERO LLAMAR*/);

module.exports = router;