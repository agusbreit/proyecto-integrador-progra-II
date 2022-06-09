var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController')


let multer = require('multer');
let path = require('path'); //nmodulo que maneja las rutas

var storage = multer.diskStorage({
    destination: function (req,file,cb) {
        cb(null, path.join(__dirname, '../public/images/fotosPerfil'))
    },
    filename: function (req,file,cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
        
    }
})

var upload = multer({storage:storage})

router.get('/register', usersController.register);

router.get('/login', usersController.login);

router.post('/login', usersController.signIn);

router.get('/profile', usersController.profile);

router.get('/profile-edit', usersController.profileEdit);

router.post('/store', upload.single('imagen'), usersController.store); 

module.exports = router;