module.exports = function (sequelize, dataTypes){

    //Definir un alias. El alias me permite identificar al modelo cuando lo usamos en el controlador.
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
        timestamps: true, //Si la tabla no tiene los campos createdAt y updatedAt
    }

    const Comentario = sequelize.define(alias, cols, config);

    //Relaciones entre tablas.
    // Comentario.associate = function(models){
    //     Comentario.belongsTo(models.Movie, {
    //         as: 'movie',
    //         foreignKey: 'genre_id'
    //     })
    // }

    return Comentario;
}