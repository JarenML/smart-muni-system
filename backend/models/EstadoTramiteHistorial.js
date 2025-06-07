module.exports = (sequelize, DataTypes) => {
    const EstadoTramiteHistorial = sequelize.define("EstadoTramiteHistorial", {
        tramite_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "tramites",
                key: "id"
            },
            onDelete: "CASCADE"
        },
        estado_nuevo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        fecha: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: "estado_tramite_historial",
        timestamps: false
    });

    return EstadoTramiteHistorial;
};
