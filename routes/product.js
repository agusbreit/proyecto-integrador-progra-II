var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController')

let multer = require('multer');
let path = require('path');


var storage = multer.diskStorage({

destination: (req, file, cb) => {
  cb(null, path.join(__dirname, '../public/images/products'))
},
filename: (req, file, cb) =>{
  cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
}});

var upload = multer({storage: storage})

router.get('/product-add', productController.productAdd)

router.post('/product-add', upload.single('imagen') , productController.post)
router.get('/:id?', productController.producto);


// router.post('/:id?', productController.delete);

module.exports = router;