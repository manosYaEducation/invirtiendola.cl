import { Modelo } from "../Modelo/modelBoleta.js";

export const Vista = {
    elementos: {},

    iniciar() {
        this.elementos = {
            inputMonto: document.getElementById("campoTexto"),
            añoSeleccionado: document.getElementById("añoSeleccionado"),
            añoLista: document.getElementById("añoLista"),
            porcentajeRetencion: document.getElementById("porcentajeRetencion"),
            mensajeError: document.getElementById("mensaje"),
            liquidoMonto: document.getElementById("liquidoMonto"),
            brutoMonto: document.getElementById("brutoMonto"),
            retencionMonto: document.getElementById("retencionMonto"),
            brutoMonto2: document.getElementById("brutoMonto2"),
            liquidoMonto2: document.getElementById("liquidoMonto2"),
            retencionMonto2: document.getElementById("retencionMonto2"),
        };
    },

    actualizarVista(valores) {
        this.elementos.liquidoMonto.textContent = Modelo.formatearCLP(valores.liquid);
        this.elementos.brutoMonto.textContent = Modelo.formatearCLP(valores.brutoDesdeLiquido);
        this.elementos.retencionMonto.textContent = Modelo.formatearCLP(valores.retencionDesdeLiquido);
        this.elementos.brutoMonto2.textContent = Modelo.formatearCLP(valores.brute);
        this.elementos.liquidoMonto2.textContent = Modelo.formatearCLP(valores.netoDesdeBruto);
        this.elementos.retencionMonto2.textContent = Modelo.formatearCLP(valores.retencionDesdeBruto);
    },

    actualizarRetencionUI(año, porcentaje) {
        this.elementos.añoSeleccionado.innerText = año;
        this.elementos.porcentajeRetencion.innerText = porcentaje + "%";
    },

    mostrarError(mensaje) {
        this.elementos.mensajeError.textContent = mensaje;
        this.elementos.mensajeError.classList.add("visible");

        setTimeout(() => {
            this.elementos.mensajeError.classList.remove("visible");
        }, 1500);
    }
};