const db = require('../database/models')
const productos = db.Producto
const usuarios = db.Usuario
const comentarios = db.Comentario

//var usuario = require('../db/usuario');
//var productos = require('../db/productos');

var usersController = {
    register: function (req, res) {
        res.render('register');
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

    login: function(req, res){
            //mostrar el form de registro
            //Chequear que un usario esté logueado
              if(req.session.user != undefined){
                return res.redirect('/')
            } else {  
                return res.render('login');
            }
        },
    
     signIn: function(req, res){
            //verificar el que el mail exista en labase de datos.
                //Buscar al usuario usando el email del form de login.
                //Del usuario conseguido chequear que la contraseña del formulario coincida con la guardad el base.
                //USamos compareSync 
                        //Si las contraseñas coinciden avisemos con mensaje que todo está ok. Cuando sepamos loguear redireccionamos a la home con el proceso de login completo.
                    //Controlar que el usario no esté logueado
          
            users.findOne({
                where: [{email: req.body.email}]
            })
                .then(function(user){
                    if(user){
                        req.session.user = user.dataValues;  //guardo al usuario que consegui con user, en el session
                        //Si el usuario tildó recordarme creo la cookie
                           //si el usuario tildo recordarme, creo la cookie. traigo con req.body el checkbox para hacer el if
                        res.cookie('userId',user.dataValues.id,{maxAge: 1000*60*100} )
                    }
                    console.log(req.session.user);
                    return res.redirect('/')
    
                })
                .catch(error => console.log(error))
            
        },
        
        logout: function(req, res){
            //destruir session
            req.session.destroy();
    
            //Eliminar cookie si existe.
            if(req.cookies.userId !== undefined){
                res.clearCookie('userId')
            }
            return res.redirect('/');
    
        }
    
    
    }


module.exports = usersController;