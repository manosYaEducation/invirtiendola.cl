document.addEventListener("DOMContentLoaded", () => {
  const campoTexto = document.getElementById("campoTexto");
  const mensajeError = document.getElementById("mensaje");

  const neto = document.getElementById("neto");
  const iva = document.getElementById("iva");
  const bruto = document.getElementById("bruto");

  const brutoMonto = document.getElementById("brutoMonto");
  const ivaBruto = document.getElementById("ivaBruto");
  const netoBruto = document.getElementById("netoBruto");

  let mensajeTimeout;

  campoTexto.addEventListener("keydown", function (event) {
    if (
      ["Backspace", "Tab", "Enter", "ArrowLeft", "ArrowRight"].includes(
        event.key
      )
    ) {
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

  campoTexto.addEventListener("input", function () {
    let valor = parseFloat(campoTexto.value) || 0;
    actualizarResultados(valor);
  });

  function formatearCLP(numero) {
    return "$" + numero.toLocaleString("es-CL", { maximumFractionDigits: 0 });
  }

  function actualizarResultados(valor) {
    const totalBruto = valor * 1.19;
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
  // Función para enviar por email
  function enviarResultadosPorEmail() {
    const emailInput = document.getElementById("emailDestino");
    if (!emailInput.value) {
      alert("Por favor, ingrese un correo electrónico");
      return;
    }

    // Obtener los valores calculados
    const datos = {
      neto: document.getElementById("neto").textContent,
      iva: document.getElementById("iva").textContent,
      bruto: document.getElementById("bruto").textContent,
      brutoMonto: document.getElementById("brutoMonto").textContent,
      ivaBruto: document.getElementById("ivaBruto").textContent,
      netoBruto: document.getElementById("netoBruto").textContent,
      emailDestino: emailInput.value,
    };

    // Verificar si hay valores calculados
    if (datos.neto === "$0" || datos.bruto === "$0") {
      alert("Por favor, ingrese un monto antes de enviar por email");
      return;
    }

    // Enviar datos al servidor
    fetch("mensajeIva.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    })
      .then((response) => response.text())
      .then((data) => {
        alert("Resultados enviados por correo exitosamente");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error al enviar el correo");
      });
  }

  // Agregar botón de envío al HTML
  const emailSection = document.querySelector(".email-section");
  if (emailSection) {
    const botonEmail = document.createElement("button");
    botonEmail.textContent = "Enviar resultados por email";
    botonEmail.style.cssText =
      "background: none; border: none; color: white; font-size: 16px; cursor: pointer; padding: 10px; text-align: center; width: auto;";
    botonEmail.onclick = enviarResultadosPorEmail;
    emailSection.appendChild(botonEmail);
  } else {
    console.error("No se encontró la sección de email");
  }
});
