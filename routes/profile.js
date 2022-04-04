var express = require('express');
var router = express.Router();
const profileController = require ('../controllers/profileController')

router.get('/', profileController.index/*.FALTA EL METODO QUE QUIERO LLAMAR*/);

module.exports = router;  