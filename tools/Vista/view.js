//recibe desde controller y los reenvia...
import { Modelo } from "../Modelo/model.js";

export const Vista = {
    elementos: {},

    iniciar() {
        this.elementos = {
            campoTexto: document.getElementById("campoTexto"),
            mensajeError: document.getElementById("mensaje"),
            neto: document.getElementById("neto"),
            iva: document.getElementById("iva"),
            bruto: document.getElementById("bruto"),
            brutoMonto: document.getElementById("brutoMonto"),
            ivaBruto: document.getElementById("ivaBruto"),
            netoBruto: document.getElementById("netoBruto"),
        };
    },

    actualizarVista(valores) {
        const { totalBruto, ivaCalculado, totalNeto } = valores;

        this.elementos.neto.textContent = Modelo.formatearCLP(totalNeto);
        this.elementos.iva.textContent = Modelo.formatearCLP(ivaCalculado);
        this.elementos.bruto.textContent = Modelo.formatearCLP(totalBruto);
        this.elementos.brutoMonto.textContent = Modelo.formatearCLP(totalBruto);
        this.elementos.ivaBruto.textContent = Modelo.formatearCLP(ivaCalculado);
        this.elementos.netoBruto.textContent = Modelo.formatearCLP(totalNeto);
    },

    mostrarError(mensaje) {
        this.elementos.mensajeError.textContent = mensaje;
        this.elementos.mensajeError.classList.add("visible");

        setTimeout(() => {
            this.elementos.mensajeError.classList.remove("visible");
        }, 1500);
    }
};

