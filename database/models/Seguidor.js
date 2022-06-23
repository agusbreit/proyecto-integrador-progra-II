module.exports = function (sequelize, dataTypes){

    let alias = 'Seguidor';

    let cols = {
        id:{
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER,
        },

        seguidorId:{
            type:dataTypes.INTEGER
        },

        seguidoId:{
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
        tableName: 'seguidores', //Nombre de la tabla en la base de datos.
        timestamps: true, 
    }

    const Seguidor = sequelize.define(alias, cols, config);


    return Seguidor;
}