document.addEventListener("DOMContentLoaded", () => {
    const empleadoInput = document.getElementById("empleado");
    const btnConsultar = document.getElementById("btnConsultar");
    const resultado = document.getElementById("resultado");

    // Permite escribir únicamente números.
    empleadoInput.addEventListener("input", () => {
        empleadoInput.value = empleadoInput.value.replace(/\D/g, "");
    });

    // Permite consultar presionando Enter.
    empleadoInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            consultarEmpleado();
        }
    });

    btnConsultar.addEventListener("click", consultarEmpleado);

    function consultarEmpleado() {
        const numeroEmpleado = empleadoInput.value.trim();

        if (numeroEmpleado === "") {
            mostrarError("Ingresa tu número de empleado.");
            empleadoInput.focus();
            return;
        }

        if (numeroEmpleado.length < 4) {
            mostrarError("Verifica el número de empleado.");
            empleadoInput.focus();
            return;
        }

        mostrarBusqueda();

        // Búsqueda simulada para probar la aplicación.
        setTimeout(() => {
            if (numeroEmpleado === "123456") {
                mostrarResultado({
                    nombre: "Participante de prueba",
                    equipo: "Fiber Force",
                    mesa: "5",
                    hora: obtenerHoraActual()
                });
            } else {
                mostrarNoEncontrado();
            }
        }, 1800);
    }

    function mostrarBusqueda() {
        btnConsultar.disabled = true;
        btnConsultar.textContent = "BUSCANDO...";

        resultado.innerHTML = `
            <div class="estado busqueda">
                <img
                    src="assets/images/boot-evolu.png"
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

    function mostrarResultado(datos) {
        btnConsultar.disabled = false;
        btnConsultar.textContent = "CONSULTAR";

        resultado.innerHTML = `
            <div class="estado resultado-exitoso">
                <div class="icono-estado">✓</div>

                <h3>¡Bienvenido!</h3>
                <h4>${datos.nombre}</h4>

                <div class="datos-competidor">
                    <div class="dato">
                        <span>🏆 Equipo</span>
                        <strong>${datos.equipo}</strong>
                    </div>

                    <div class="dato">
                        <span>📍 Mesa</span>
                        <strong>${datos.mesa}</strong>
                    </div>

                    <div class="dato">
                        <span>✅ Registro</span>
                        <strong>${datos.hora}</strong>
                    </div>
                </div>

                <p class="mensaje-final">
                    ¡Prepárate para la misión!
                </p>
            </div>
        `;
    }

    function mostrarNoEncontrado() {
        btnConsultar.disabled = false;
        btnConsultar.textContent = "CONSULTAR";

        resultado.innerHTML = `
            <div class="estado resultado-error">
                <div class="icono-estado">!</div>

                <h3>Número no encontrado</h3>

                <p>
                    Verifica tu número de empleado o solicita asistencia
                    al comité organizador.
                </p>
            </div>
        `;
    }

    function mostrarError(mensaje) {
        resultado.innerHTML = `
            <div class="mensaje-validacion">
                ${mensaje}
            </div>
        `;
    }

    function obtenerHoraActual() {
        return new Intl.DateTimeFormat("es-DO", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true
        }).format(new Date());
    }
});
