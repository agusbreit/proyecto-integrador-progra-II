var express = require('express');
var router = express.Router();
const usersController = require ('../controllers/usersController')

router.get('/', usersController.index/*.FALTA EL METODO QUE QUIERO LLAMAR*/);

module.exports = router;  