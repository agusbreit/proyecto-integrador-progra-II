var express = require('express');
var router = express.Router();
const productAddController = require ('../controllers/productAddController')

router.get('/', productAddController/*.FALTA EL METODO QUE QUIERO LLAMAR*/);

module.exports = router;