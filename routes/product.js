var express = require('express');
var router = express.Router();
const productController = require ('../controllers/productController')

router.get('/', productController.index/*.FALTA EL METODO QUE QUIERO LLAMAR*/);

module.exports = router;