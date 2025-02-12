//trae los datos del html, las envia al modelo

//recive nuevos datos del modelo y los envia a View
import { Modelo } from "../Modelo/model.js";
import { Vista } from "../Vista/view.js";

export const Controlador = {
    iniciar() {
        Vista.iniciar();
        const { campoTexto } = Vista.elementos;

        campoTexto.addEventListener("keydown", (event) => {
            if (["Backspace", "Tab", "Enter", "ArrowLeft", "ArrowRight"].includes(event.key)) {
                return;
            }
            if (!/^\d$/.test(event.key)) {
                event.preventDefault();
                Vista.mostrarError("Solo se permiten números");
            }
        });

        campoTexto.addEventListener("input", () => {
            let valor = parseFloat(campoTexto.value.replace(/\D/g, "")) || 0; // Elimina caracteres no numéricos
            const valores = Modelo.calcularValores(valor);
            Vista.actualizarVista(valores);
        });
    }
};
