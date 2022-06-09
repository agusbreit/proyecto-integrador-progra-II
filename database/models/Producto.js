module.exports = function (sequelize, dataTypes){

    let alias = 'Producto';

    let cols = {
        id:{
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER,
        },

        nombre:{
            type:dataTypes.STRING
        },

        imagen:{
            type:dataTypes.STRING
        },

        descripcion:{
            type:dataTypes.STRING
        },

        usuarioId:{
            type:dataTypes.INTEGER
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
        tableName: 'productos', //Nombre de la tabla en la base de datos.
        timestamps: true, //Si la tabla no tiene los campos createdAt y updatedAt
    }

    const Producto = sequelize.define(alias, cols, config);

    //Relaciones entre tablas.
    Producto.associate = function(models){

        Producto.belongsTo(models.Usuario,{
            as:'usuario',
            foreignKey: 'UsuarioId'
        })
        Producto.hasMany(models.Comentario, {
            as:'comentario',
            foreignKey:'ProductoId'
        })
  
    }

    return Producto;
}