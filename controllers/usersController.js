const db = require('../database/models')
const productos = db.Producto
const usuarios = db.Usuario
const comentarios = db.Comentario
const seguidores = db.Seguidor
const bcrypt = require('bcryptjs');
//const { where } = require('sequelize/types');

//var usuario = require('../db/usuario');
//var productos = require('../db/productos');

var usersController = {
    register: function (req, res) {
        if (req.session.user != undefined) {
            return res.redirect('/')
        } else {
            return res.render('register')
        }
    },
    profile: function (req, res) {
        productos.findAll({
                where: [{
                    usuarioId: req.params.id
                }],
            })
            .then(function (productos) {
                usuarios.findByPk(req.params.id)
                    .then(function (usuarios) {
                        seguidores.findAll({
                                where: [{
                                    seguidoId: req.params.id
                                }]
                            })
                            .then(function (seguidores) {
                                comentarios.findAll({
                                        include: [{
                                            association: "usuario"
                                        }],
                                        where: [{
                                            usuarioId: req.params.id
                                        }]
                                    })
                                    .then(function (comentarios) {
                                        return res.render('profile', {
                                            usuarios: usuarios,
                                            productos: productos,
                                            seguidores: seguidores,
                                            comentarios: comentarios
                                        });
                                    })
                                    .catch(error => console.log(error))
                            })
                            .catch(error => console.log(error))
                    })
                    .catch(error => console.log(error))
            })
            .catch(error => console.log(error))
    },
    seguir: function (req, res) {
        seguidores.findOne({
                where: [{
                    seguidorId: req.session.user.id,
                    seguidoId: req.params.id
                }]
            })
            .then(function (user) {
                if (user) {
                    seguidores.destroy({
                        where: { seguidorId: req.session.user.id, seguidoId: req.params.id}
                    })
                    .then(function (answer) {
                        return res.redirect(`/users/profile/${req.params.id}`)
                    })
                    .catch(error => console.log(error))
                } else {
                    seguidores.create({
                            seguidorId: req.session.user.id,
                            seguidoId: req.params.id
                        })
                        .then(function (respuesta) {
                            return res.redirect(`/users/profile/${req.params.id}`)
                        })
                        .catch(error => console.log(error))
                }
            })
          .catch(error => console.log(error))

    },
    profileEdit: function (req, res) {
        if (req.session.user == undefined) {
            return res.redirect('/')
        } else {
            return res.render('profile-edit')
        }
    },
    edit: function (req, res) {
        //detectar errores de los datos del usuairo en el form 
        let errores = {}
        if (req.body.nombreUsuario == '') {
            errores.message = "El nombre de usuario es obligatorio" //le agrego la posicion message al obj literal errores
            res.locals.errores = errores //en locals.errors, va a estar el obj literal errores. se lo estoy pasando a la vista
            return res.render('profile-edit');
        } else if (req.body.email == '') {
            errores.message = "El email es obligatorio" //le agrego la posicion message al obj literal errores
            res.locals.errores = errores //en locals.errors, va a estar el obj literal errores. se lo estoy pasando a la vista
            return res.render('profile-edit');
        } else if (req.body.contrasena == '') {
            errores.message = "La contraseña es obligatoria"
            res.locals.errores = errores
            return res.render('profile-edit');
        } else if (req.body.contrasena.length < 3) {
            errores.message = "La contraseña tiene que tener al menos 3 caracteres" //le agrego la posicion message al obj literal errores
            res.locals.errores = errores
            return res.render('profile-edit');
        } else if (req.body.contrasenaAnterior == '') {
            errores.message = "Escriba su contraseña anterior" //le agrego la posicion message al obj literal errores
            res.locals.errores = errores
            return res.render('profile-edit');
        } else {
            //chequear que la contrasena anterior es correcta 
            usuarios.findOne({
                    where: [{
                        email: req.body.email
                    }]
                })
                .then(function (user) {
                    if (user) {
                        let compare = bcrypt.compareSync(req.body.contrasenaAnterior, user.contrasena)
                        if (compare) {
                            let user = {
                                email: req.body.email,
                                nombreUsuario: req.body.nombreUsuario,
                                contrasena: bcrypt.hashSync(req.body.contrasena, 10), //vamos a hashear la contrasena que viene del form
                                nacimiento: req.body.nacimiento,
                                documento: req.body.documento,
                                imagen: req.file.filename
                            }
                            usuarios.update(user, {
                                    where: [{
                                        id: req.body.id
                                    }]
                                })
                                .then(function (user) {

                                    return res.redirect('/')

                                })
                                .catch(error => console.log(error))
                        } else {
                            errores.message = "La contraseña anterior es incorrecta" //le agrego la posicion message al obj literal errores
                            res.locals.errores = errores //en locals.errors, va a estar el obj literal errores. se lo estoy pasando a la vista
                            return res.render('profile-edit');
                        }
                    } else {
                        errores.message = "El mail nunca fue registrado" //le agrego la posicion message al obj literal errores
                        res.locals.errores = errores //en locals.errors, va a estar el obj literal errores. se lo estoy pasando a la vista
                        return res.render('register');
                    }
                })
                .catch(error => console.log(error))
        }
    },
    store: function (req, res) {
        //detectar errores de los datos del usuairo en el form 
        let errores = {}
        //chequear que el email no este vacio 
        if (req.body.nombreUsuario == '') {
            errores.message = "El nombre de usuario es obligatorio" //le agrego la posicion message al obj literal errores
            res.locals.errores = errores //en locals.errors, va a estar el obj literal errores. se lo estoy pasando a la vista
            return res.render('register');
        } else if (req.body.email == '') {
            errores.message = "El email es obligatorio" //le agrego la posicion message al obj literal errores
            res.locals.errores = errores //en locals.errors, va a estar el obj literal errores. se lo estoy pasando a la vista
            return res.render('register');
        } else if (req.body.contrasena == '') {
            errores.message = "La contraseña es obligatoria"
            res.locals.errores = errores
            return res.render('register');
        } else if (req.body.contrasena.length < 3) {
            errores.message = "La contraseña tiene que tener al menos 3 caracteres" //le agrego la posicion message al obj literal errores
            res.locals.errores = errores
            return res.render('register');
        } else {
            //chequear que el email no exista en la base 
            usuarios.findOne({
                    where: [{
                        email: req.body.email
                    }]
                })
                .then(function (user) {
                    if (user !== null) {
                        errores.message = "Ese email ya existe, elija otro" //le agrego la posicion message al obj literal errores
                        res.locals.errores = errores //en locals.errors, va a estar el obj literal errores. se lo estoy pasando a la vista
                        return res.render('register');
                    } else {
                        usuarios.findOne({
                                where: [{
                                    nombreUsuario: req.body.nombreUsuario
                                }]
                            })
                            .then(function (user) {
                                if (user !== null) {
                                    errores.message = "Ese nombre de usuario ya existe, elija otro" //le agrego la posicion message al obj literal errores
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
                                    //Guardar la info en la base de datos 
                                    usuarios.create(user) //el primer userss llama al modelo que esta en db (los metodos siempre tienen que estar unidos a un modelo)
                                        .then(function (respuesta) {
                                            //Redirigir
                                            return res.redirect('/')
                                        })
                                        .catch(error => console.log(error))
                                }
                            })
                            .catch(error => console.log(error))
                    }
                })
                .catch(error => console.log(error))
        }
    },
    login: function (req, res) {
        if (req.session.user != undefined) {
            return res.redirect('/')
        } else {
            return res.render('login');
        }
    },
    signIn: function (req, res) {
        let errores = {}
        //Del usuario conseguido chequear que la contraseña del formulario coincida con la guardad el base.
        //USamos compareSync 
        //Si las contraseñas coinciden avisemos con mensaje que todo está ok. Cuando sepamos loguear redireccionamos a la home con el proceso de login completo.
        //Controlar que el usario no esté logueado
        usuarios.findOne({
                where: [{
                    email: req.body.email
                }]
            })
            .then(function (user) {
                if (user) {
                    let compare = bcrypt.compareSync(req.body.contrasena, user.contrasena);
                    if (compare) {
                        req.session.user = user.dataValues; //guardo al usuario que consegui con user, en el session
                        //Si el usuario tildó recordarme creo la cookie
                        //si el usuario tildo recordarme, creo la cookie. traigo con req.body el checkbox para hacer el if
                        // return res.send(req.body)
                        if (req.body.recordarme) {
                            res.cookie('userId', user.dataValues.id, {
                                maxAge: 1000 * 60 * 100
                            })
                        }
                        return res.redirect('/');
                    } else {
                        errores.message = "Contraseña incorrecta" //le agrego la posicion message al obj literal errores
                        res.locals.errores = errores //en locals.errors, va a estar el obj literal errores. se lo estoy pasando a la vista
                        return res.render('login');
                    }

                } else {
                    errores.message = "Ese mail no existe" //le agrego la posicion message al obj literal errores
                    res.locals.errores = errores //en locals.errors, va a estar el obj literal errores. se lo estoy pasando a la vista
                    return res.render('login');
                }
            })
            .catch(error => console.log(error))

    },

    logout: function (req, res) {
        //destruir session
        req.session.destroy();

        //Eliminar cookie si existe.
        if (req.cookies.userId !== undefined) {
            res.clearCookie('userId')
        }
        return res.redirect('/');
    }


}


module.exports = usersController;