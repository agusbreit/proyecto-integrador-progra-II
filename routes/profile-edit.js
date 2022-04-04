var express = require('express');
var router = express.Router();
const profileEditController = require ('../controllers/profile-editController')

router.get('/', profileEditController.index);

module.exports = router;  