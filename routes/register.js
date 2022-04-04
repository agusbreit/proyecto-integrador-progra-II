var express = require('express');
var router = express.Router();
const registerController = require ('../controllers/registerController')

router.get('/', registerController.index/*.FALTA EL METODO QUE QUIERO LLAMAR*/);

module.exports = router;  