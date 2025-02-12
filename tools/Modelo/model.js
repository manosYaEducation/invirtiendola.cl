// interactúa los datos desde el controller, maneja logica y la devuelve al controlador

export const Modelo = {
    calcularValores(valor) {
        const totalBruto = valor;
        const totalNeto = valor / 1.19;
        const ivaCalculado = totalBruto - totalNeto;
        return { totalBruto, ivaCalculado, totalNeto };
    },

    formatearCLP(numero) {
        return "$" + numero.toLocaleString("es-CL", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    }
};
