var express = require('express');
var router = express.Router();
const indexController = require ('../controllers/indexController')

router.get('/', indexController.index/*.FALTA EL METODO QUE QUIERO LLAMAR*/);

module.exports = router;
