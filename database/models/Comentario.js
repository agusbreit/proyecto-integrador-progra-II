module.exports = function (sequelize, dataTypes){

    //Definir un alias
    let alias = 'Comentario';

    //Columnas y sus características
    let cols = {
        id:{
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER,
        },
        comentario:{
            type:dataTypes.STRING
        },
        usuarioId:{
            type:dataTypes.INTEGER
        },
        productoId:{
            type:dataTypes.INTEGER
        }, 
        productoId:{
            type:dataTypes.INTEGER
        },
        updatedAt: {
            type: dataTypes.DATE,
            allowNull: true,
        }, 
        createdAt : {
            type: dataTypes.DATE,
            allowNull:true,
        },
        deletedAt : {
            type: dataTypes.DATE,
            allowNull:true,
        }
        
    }

    //Configuraciones adicionales
    let config = {
        tableName: 'comentarios', //Nombre de la tabla en la base de datos.
        timestamps: true, 
    }

    const Comentario = sequelize.define(alias, cols, config);

    //Relaciones entre tablas.
    Comentario.associate = function(models){
        Comentario.belongsTo(models.Usuario, {
            as: 'usuario',
            foreignKey: 'usuarioId'
        })
        Comentario.belongsTo(models.Producto, {
            as: 'producto',
            foreignKey: 'productoId'
        })
    }

    return Comentario;
}