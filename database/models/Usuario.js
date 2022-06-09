module.exports = function (sequelize, dataTypes){

    let alias = 'Usuario';

    let cols = {
        id:{
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER,
        },
        nombreUsuario:{
            type:dataTypes.STRING
        },
        email:{
            type:dataTypes.STRING
        },
        contrasena:{
            type:dataTypes.STRING
        },
        nacimiento:{
            type:dataTypes.DATE
        },
        documento:{
            type:dataTypes.INTEGER
        },
        imagen:{
            type:dataTypes.STRING
        },
        createdAt: {
            type: dataTypes.DATE,
            allowNull: true
        },
        updatedAt: {
            type: dataTypes.DATE,
            allowNull: true
        },
        deletedAt: {
            type: dataTypes.DATE,
            allowNull: true
        },

        
    }

    //Configuraciones adicionales
    let config = {
        tableName: 'usuarios', //Nombre de la tabla en la base de datos.
        timestamps: true, //Si la tabla no tiene los campos createdAt y updatedAt
    }

    const Usuario = sequelize.define(alias, cols, config);

    //Relaciones entre tablas.
    Usuario.associate = function(models){
        Usuario.hasMany(models.Comentario, {
            as: 'comentario',
            foreignKey: 'UsuarioId'
        })
        Usuario.hasMany(models.Producto, {
            as: 'producto',
            foreignKey: 'UsuarioId'
        })
        Usuario.belongsToMany(models.Usuario, {
            as: 'seguidor',
            through: 'seguidores',
            foreignKey: 'seguidoId',
            otherKey: 'seguidorId',
            timestamps: true
        })
        Usuario.belongsToMany(models.Usuario, {
            as: 'seguido',
            through: 'seguidores',
            foreignKey: 'seguidorId',
            otherKey: 'seguidoId',
            timestamps: true
        })
    }

    return Usuario;
}