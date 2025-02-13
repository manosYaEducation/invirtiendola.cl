export const Modelo = {
    retencionSII: 13.75, // Por defecto para 2024

    calcularValores(valorIngresado) {
        const factor = (100 - this.retencionSII) / 100;

        return {
            brutoDesdeLiquido: valorIngresado / factor,
            retencionDesdeLiquido: (valorIngresado / factor) - valorIngresado,
            netoDesdeBruto: valorIngresado * factor,
            retencionDesdeBruto: valorIngresado - (valorIngresado * factor),
            liquid:valorIngresado,
            brute:valorIngresado,
        };
    },

    actualizarRetencion(nuevoPorcentaje) {
        this.retencionSII = nuevoPorcentaje;
    },

    formatearCLP(numero) {
        return "$" + Math.round(numero).toLocaleString("es-CL");
    }
};
