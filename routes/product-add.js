var express = require('express');
var router = express.Router();
const productAddController = require ('../controllers/product-addController')

router.get('/', productAddController.index);

module.exports = router;