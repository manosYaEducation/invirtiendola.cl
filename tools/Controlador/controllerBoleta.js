import { Modelo } from "../Modelo/modelBoleta.js";
import { Vista } from "../Vista/viewBoleta.js";

export const Controlador = {
    iniciar() {
        Vista.iniciar();

        // Eventos de entrada del monto
        Vista.elementos.inputMonto.addEventListener("keydown", this.validarInput);
        Vista.elementos.inputMonto.addEventListener("input", this.actualizarCalculo);

        // Eventos de selección del año
        Vista.elementos.añoLista.addEventListener("click", this.seleccionarAño);
        Vista.elementos.añoSeleccionado.addEventListener("click", this.toggleListaAños);
        document.addEventListener("click", this.cerrarListaAños);
    },

    validarInput(event) {
        if (["Backspace", "Tab", "Enter", "ArrowLeft", "ArrowRight"].includes(event.key)) {
            return;
        }
        if (!/^\d$/.test(event.key)) {
            event.preventDefault();
            Vista.mostrarError("Solo se permiten números");
        }
    },

    actualizarCalculo() {
        const valorIngresado = parseFloat(Vista.elementos.inputMonto.value.replace(/\D/g, "")) || 0;
        const valores = Modelo.calcularValores(valorIngresado);
        Vista.actualizarVista(valores);
    },

    seleccionarAño(event) {
        if (event.target.tagName === "LI") {
            const nuevoAño = event.target.innerText;
            const nuevoPorcentaje = parseFloat(event.target.getAttribute("data-porcentaje"));

            Modelo.actualizarRetencion(nuevoPorcentaje);
            Vista.actualizarRetencionUI(nuevoAño, nuevoPorcentaje);
            
            document.querySelector(".dropdown-menu .active")?.classList.remove("active");
            event.target.classList.add("active");
            Vista.elementos.añoLista.style.display = "none";

            Controlador.actualizarCalculo();
        }
    },

    toggleListaAños() {
        Vista.elementos.añoLista.style.display =
            Vista.elementos.añoLista.style.display === "block" ? "none" : "block";
    },

    cerrarListaAños(event) {
        if (!Vista.elementos.añoSeleccionado.contains(event.target) &&
            !Vista.elementos.añoLista.contains(event.target)) {
            Vista.elementos.añoLista.style.display = "none";
        }
    }
};