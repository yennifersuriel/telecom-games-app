document.addEventListener("DOMContentLoaded", function () {
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

    function consultarEmpleado() {
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

        setTimeout(function () {
            if (numeroEmpleado === "123456") {
                mostrarExito();
            } else {
                mostrarNoEncontrado();
            }
        }, 1800);
    }

    function mostrarBusqueda() {
        botonConsultar.disabled = true;
        botonConsultar.textContent = "BUSCANDO...";

        resultado.innerHTML = `
            <div class="estado busqueda">
                <img
                    src="./assets/images/boot-evolu.png"
                    alt="BOOT EVOLU"
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

    function mostrarExito() {
        botonConsultar.disabled = false;
        botonConsultar.textContent = "CONSULTAR";

        resultado.innerHTML = `
            <div class="estado resultado-exitoso">
                <div class="icono-estado">✓</div>

                <h3>¡Bienvenido!</h3>
                <h4>Participante de prueba</h4>

                <div class="datos-competidor">
                    <div class="dato">
                        <span>🏆 Equipo</span>
                        <strong>Fiber Force</strong>
                    </div>

                    <div class="dato">
                        <span>📍 Mesa</span>
                        <strong>5</strong>
                    </div>

                    <div class="dato">
                        <span>✅ Registro</span>
                        <strong>${obtenerHora()}</strong>
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
    }

    function mostrarNoEncontrado() {
        botonConsultar.disabled = false;
        botonConsultar.textContent = "CONSULTAR";

        resultado.innerHTML = `
            <div class="estado resultado-error">
                <div class="icono-estado">!</div>

                <h3>Número no encontrado</h3>

                <p>
                    Verifica el número o solicita asistencia
                    al comité organizador.
                </p>
            </div>
        `;

        resultado.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });
    }

    function mostrarValidacion(mensaje) {
        resultado.innerHTML = `
            <div class="mensaje-validacion">
                ${mensaje}
            </div>
        `;
    }

    function obtenerHora() {
        return new Intl.DateTimeFormat("es-DO", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true
        }).format(new Date());
    }
});
