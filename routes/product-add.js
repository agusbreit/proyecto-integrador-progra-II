var express = require('express');
var router = express.Router();
const productAddController = require ('../controllers/product-addController')

router.get('/', productAddController.index/*.FALTA EL METODO QUE QUIERO LLAMAR*/);

module.exports = router;