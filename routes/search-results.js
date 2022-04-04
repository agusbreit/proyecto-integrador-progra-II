var express = require('express');
var router = express.Router();
const searchResultsController = require ('../controllers/search-resultsController')

router.get('/', searchResultsController.index/*.FALTA EL METODO QUE QUIERO LLAMAR*/);

module.exports = router;  