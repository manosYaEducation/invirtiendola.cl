document.addEventListener("DOMContentLoaded", function () {
    const inputMonto = document.getElementById("campoTexto");
    const añoSeleccionado = document.getElementById("añoSeleccionado");
    const añoLista = document.getElementById("añoLista");
    const porcentajeRetencion = document.getElementById("porcentajeRetencion");
    const mensajeError = document.getElementById("mensaje");

    let retencionSII = 13.75; // Por defecto para 2024

    //calcular valores según el monto ingresado
    function calcularValores() {
        const valorIngresado = parseFloat(inputMonto.value) || 0;
        const factor = (100 - retencionSII) / 100;

        //líquido a bruto
        const brutoDesdeLiquido = valorIngresado / factor;
        const retencionDesdeLiquido = brutoDesdeLiquido - valorIngresado;

        //bruto a líquido
        const netoDesdeBruto = valorIngresado * factor;
        const retencionDesdeBruto = valorIngresado - netoDesdeBruto;

        // Actualizar la interfaz
        document.getElementById("liquidoMonto").textContent = `$${Math.round(valorIngresado)}`;
        document.getElementById("brutoMonto").textContent = `$${Math.round(brutoDesdeLiquido)}`;
        document.getElementById("retencionMonto1").textContent = `$${Math.round(retencionDesdeLiquido)}`;

        document.getElementById("brutoMonto2").textContent = `$${Math.round(valorIngresado)}`;
        document.getElementById("liquidoMonto2").textContent = `$${Math.round(netoDesdeBruto)}`;
        document.getElementById("retencionMonto2").textContent = `$${Math.round(retencionDesdeBruto)}`;

        // Si el input está vacío, restablecer los valores a $0
        if (inputMonto.value.trim() === "") {
            document.getElementById("liquidoMonto").textContent = "$0";
            document.getElementById("brutoMonto").textContent = "$0";
            document.getElementById("retencionMonto1").textContent = "$0";
            document.getElementById("brutoMonto2").textContent = "$0";
            document.getElementById("liquidoMonto2").textContent = "$0";
            document.getElementById("retencionMonto2").textContent = "$0";
        }
    }

    //selección del año y actualizar la retención
    añoLista.addEventListener("click", function (event) {
        if (event.target.tagName === "LI") {
            const nuevoAño = event.target.innerText;
            const nuevoPorcentaje = parseFloat(event.target.getAttribute("data-porcentaje"));

            añoSeleccionado.innerText = nuevoAño;
            porcentajeRetencion.innerText = nuevoPorcentaje + "%";
            retencionSII = nuevoPorcentaje;

            document.querySelector(".dropdown-menu .active")?.classList.remove("active");
            event.target.classList.add("active");

            añoLista.style.display = "none";

            calcularValores();
        }
    });

    // Mostrar u ocultar el menú
    añoSeleccionado.addEventListener("click", function () {
        añoLista.style.display = añoLista.style.display === "block" ? "none" : "block";
    });

    //clic fuera
    document.addEventListener("click", function (event) {
        if (!añoSeleccionado.contains(event.target) && !añoLista.contains(event.target)) {
            añoLista.style.display = "none";
        }
    });

    let mensajeTimeout;

    inputMonto.addEventListener("keydown", function(event) {
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

    //update
    inputMonto.addEventListener("input", calcularValores);
});