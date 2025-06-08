module.exports = (sequelize, DataTypes) => {
    const EstadoTramiteHistorial = sequelize.define('EstadoTramiteHistorial', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        tramite_id: { type: DataTypes.INTEGER, allowNull: false },
        estado_nuevo: { type: DataTypes.STRING(30), allowNull: false },
        descripcion: { type: DataTypes.TEXT },
        fecha: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
    }, {
        tableName: 'estado_tramite_historial',
        timestamps: false
    });

    return EstadoTramiteHistorial;
};
