const memoriaUsuarios = new Map();

function obtenerHistorial(userId) {
    return memoriaUsuarios.get(userId) || [];
}

function guardarMensaje(userId, mensaje) {
    const historial = obtenerHistorial(userId);
    historial.push(mensaje);
    memoriaUsuarios.set(userId, historial.slice(-10)); // máximo 10 mensajes
}

function limpiarMemoria(userId) {
    memoriaUsuarios.delete(userId);
}

module.exports = {
    obtenerHistorial,
    guardarMensaje,
    limpiarMemoria
};
