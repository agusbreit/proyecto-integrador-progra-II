const db = require('../database/models')
const productos = db.Producto
const usuarios = db.Usuario
const comentarios = db.Comentario
const bcrypt = require('bcryptjs');

//var usuario = require('../db/usuario');
//var productos = require('../db/productos');

var usersController = {
    register: function (req, res) {
        res.render('register');
    },
    login: function (req, res) {
        res.render('login');
    },
    profile: function (req, res) {
        res.render('profile', {
            usuario: usuario,
            productos: productos,
        });
    },
    profileEdit: function (req, res) {
        res.render('profile-edit', {
            usuario: usuario,
        });
    },
    store: function (req,res) {
            //detectar errores de los datos del usuairo en el form 
            let errores = {}
            //chequear que el email no este vacio 
            if(req.body.email == ''){
                errores.message = "El email es obligatorio"  //le agrego la posicion message al obj literal errores
                res.locals.errores = errores //en locals.errors, va a estar el obj literal errores. se lo estoy pasando a la vista
                return res.render('register');
            } else if (req.body.contrasena == ''){ 
                errores.message = "La contraseña es obligatoria" 
                res.locals.errores = errores 
                return res.render('register');
            } else if (req.body.contrasena.length < 4){ 
                errores.message = "La contraseña tiene que ser de 4 o mas caracteres"  //le agrego la posicion message al obj literal errores
                res.locals.errores = errores 
                return res.render('register');   
            } else {
                 //chequear que el email no exista en la base 
                 usuarios.findOne({
                    where: [{email: req.body.email}]
                })
                .then(function(user){
                    if(user !== null ){
                        errores.message = "Ese email ya existe, elija otro"  //le agrego la posicion message al obj literal errores
                        res.locals.errores = errores //en locals.errors, va a estar el obj literal errores. se lo estoy pasando a la vista
                        return res.render('register');
                    } else {
                         //Obtener los datos del formulario y armar objeto literal con los datos que quiero guardar 
                    let user = {
                        email: req.body.email,
                        nombreUsuario: req.body.nombreUsuario,
                        contrasena: bcrypt.hashSync(req.body.contrasena, 10), //vamos a hashear la contrasena que viene del form
                        nacimiento: req.body.nacimiento,
                        documento: req.body.documento,
                        imagen: req.file.filename
                    }
                    //return res.send(user)
                    //Guardar la info en la base de datos 
                    usuarios.create(user)//el primer userss llama al modelo que esta en db (los metodos siempre tienen que estar unidos a un modelo)
                        .then( function(respuesta){
                         //Redirigir
                        return res.redirect('/')
                    })
                    .catch (error => console.log(error)) 
                    }
                })
                .catch (error => console.log(error)) 
            }
    }
    
    
};

module.exports = usersController;