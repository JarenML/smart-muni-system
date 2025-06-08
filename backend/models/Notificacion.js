module.exports = (sequelize, DataTypes) => {
    const Notificacion = sequelize.define('Notificacion', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        user_id: { type: DataTypes.INTEGER, allowNull: false },
        tramite_id: { type: DataTypes.INTEGER, allowNull: false },
        mensaje: { type: DataTypes.TEXT, allowNull: false },
        leido: { type: DataTypes.BOOLEAN, defaultValue: false },
        fecha: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
    }, {
        tableName: 'notificaciones',
        timestamps: false
    });

    return Notificacion;
};
