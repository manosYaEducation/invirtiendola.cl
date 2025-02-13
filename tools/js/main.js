import { Controlador } from "../Controlador/controller.js";

document.addEventListener("DOMContentLoaded", () => {
    Controlador.iniciar();
});

/* document.addEventListener("DOMContentLoaded", () => {
    const campoTexto = document.getElementById("campoTexto");
    const mensajeError = document.getElementById("mensaje");

    const neto = document.getElementById("neto");
    const iva = document.getElementById("iva");
    const bruto = document.getElementById("bruto");

    const brutoMonto = document.getElementById("brutoMonto");
    const ivaBruto = document.getElementById("ivaBruto");
    const netoBruto = document.getElementById("netoBruto");

    let mensajeTimeout;

    campoTexto.addEventListener("keydown", function(event) {
        if (["Backspace", "Tab", "Enter", "ArrowLeft", "ArrowRight"].includes(event.key)) {
            return;
        }
        if (!/^\d$/.test(event.key)) {
            event.preventDefault();
            mensajeError.textContent = "Solo se permiten números";
            mensajeError.classList.add("visible");

            clearTimeout(mensajeTimeout);
            mensajeTimeout = setTimeout(() => {
                mensajeError.classList.remove("visible");
            }, 1500);
        } else {
            mensajeError.classList.remove("visible");
        }
    });

    campoTexto.addEventListener("input", function() {
        let valor = parseFloat(campoTexto.value) || 0; 
        actualizarResultados(valor);
    });

    function formatearCLP(numero) {
        return "$" + numero.toLocaleString("es-CL", { maximumFractionDigits: 0 });
    }    

    function actualizarResultados(valor) {
        const totalBruto = valor;
        const ivaCalculado = valor * 0.19;
        const totalNeto = valor / 1.19;
        const ivaNeto = totalNeto * 0.19;

        neto.textContent = formatearCLP(valor);
        iva.textContent = formatearCLP(ivaCalculado);
        bruto.textContent = formatearCLP(totalBruto);

        brutoMonto.textContent = formatearCLP(totalBruto);
        ivaBruto.textContent = formatearCLP(ivaNeto);
        netoBruto.textContent = formatearCLP(totalNeto);
    }
});
 */