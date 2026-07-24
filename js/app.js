document.addEventListener("DOMContentLoaded", function () {
    const URL_APPS_SCRIPT =
        "https://script.google.com/macros/s/AKfycbygHEVZ0d-4MkqRXMNoIhMvpdESWmZpia_Pc2nefHbqgrFp6BSZUjtC6FxDogkM7be8Vw/exec";

    const inputEmpleado = document.getElementById("empleado");
    const botonConsultar = document.getElementById("btnConsultar");
    const resultado = document.getElementById("resultado");

    if (!inputEmpleado || !botonConsultar || !resultado) {
        console.error("No se encontraron los elementos de la aplicación.");
        return;
    }

    inputEmpleado.addEventListener("input", function () {
        inputEmpleado.value = inputEmpleado.value.replace(/\D/g, "");
    });

    inputEmpleado.addEventListener("keydown", function (evento) {
        if (evento.key === "Enter") {
            consultarEmpleado();
        }
    });

    botonConsultar.addEventListener("click", consultarEmpleado);

    async function consultarEmpleado() {
        const numeroEmpleado = inputEmpleado.value.trim();

        if (numeroEmpleado === "") {
            mostrarValidacion("Ingresa tu número de empleado.");
            inputEmpleado.focus();
            return;
        }

        if (numeroEmpleado.length < 4) {
            mostrarValidacion("Verifica el número de empleado.");
            inputEmpleado.focus();
            return;
        }

        mostrarBusqueda();

        try {
            const respuesta = await fetch(URL_APPS_SCRIPT, {
                method: "POST",
                redirect: "follow",
                headers: {
                    "Content-Type": "text/plain;charset=utf-8"
                },
                body: JSON.stringify({
                    idEmpleado: numeroEmpleado
                })
            });

            if (!respuesta.ok) {
                throw new Error(
                    "El servicio respondió con estado " + respuesta.status
                );
            }

            const datos = await respuesta.json();

            if (datos.encontrado === true) {
                mostrarExito(datos);
            } else {
                mostrarNoEncontrado(
                    datos.mensaje || "Número de empleado no encontrado."
                );
            }
        } catch (error) {
            console.error("Error de conexión:", error);

            mostrarErrorConexion();
        }
    }

    function mostrarBusqueda() {
        botonConsultar.disabled = true;
        botonConsultar.textContent = "BUSCANDO...";

        resultado.innerHTML = `
            <div class="estado busqueda">
                <img
                    src="./assets/images/boot-evolu.png"
                    alt="BOOT EVOLU buscando"
                    class="boot-estado"
                >

                <h3>BOOT EVOLU está buscando...</h3>
                <p>Espera un momento.</p>

                <div class="barra-carga">
                    <div class="barra-progreso"></div>
                </div>
            </div>
        `;
    }

    function mostrarExito(datos) {
        botonConsultar.disabled = false;
        botonConsultar.textContent = "CONSULTAR";

        resultado.innerHTML = `
            <div class="estado resultado-exitoso">
                <div class="icono-estado">✓</div>

                <h3>¡Registro exitoso!</h3>
                <h4>${escaparHtml(datos.nombre)}</h4>

                <div class="datos-competidor">
                    <div class="dato">
                        <span>🏆 Equipo</span>
                        <strong>${escaparHtml(datos.equipo)}</strong>
                    </div>

                    <div class="dato">
                        <span>📍 Mesa</span>
                        <strong>${escaparHtml(datos.mesa)}</strong>
                    </div>

                    <div class="dato">
                        <span>✅ Hora</span>
                        <strong>${escaparHtml(datos.hora)}</strong>
                    </div>
                </div>

                <p class="mensaje-final">
                    ¡Prepárate para la misión!
                </p>
            </div>
        `;

        resultado.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });
        setTimeout(function () {
    reiniciarFormulario();
}, 10000);
    }

    function mostrarNoEncontrado(mensaje) {
        botonConsultar.disabled = false;
        botonConsultar.textContent = "CONSULTAR";

        resultado.innerHTML = `
            <div class="estado resultado-error">
                <div class="icono-estado">!</div>

                <h3>Número no encontrado</h3>

                <p>${escaparHtml(mensaje)}</p>
            </div>
        `;
    }

    function mostrarErrorConexion() {
        botonConsultar.disabled = false;
        botonConsultar.textContent = "CONSULTAR";

        resultado.innerHTML = `
            <div class="estado resultado-error">
                <div class="icono-estado">!</div>

                <h3>No se pudo conectar</h3>

                <p>
                    Revisa tu conexión a internet e inténtalo nuevamente.
                </p>
            </div>
        `;
    }

    function mostrarValidacion(mensaje) {
        resultado.innerHTML = `
            <div class="mensaje-validacion">
                ${escaparHtml(mensaje)}
            </div>
        `;
    }

    function escaparHtml(valor) {
        const elemento = document.createElement("div");
        elemento.textContent = String(valor ?? "");
        return elemento.innerHTML;
    }
    function reiniciarFormulario() {
    inputEmpleado.value = "";
    resultado.innerHTML = "";
    botonConsultar.disabled = false;
    botonConsultar.textContent = "CONSULTAR";
    inputEmpleado.focus();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
});
