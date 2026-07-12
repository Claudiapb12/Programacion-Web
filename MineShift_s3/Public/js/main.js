// Esperamos que la página cargue por completo
document.addEventListener("DOMContentLoaded", function() {
    
    // Buscamos el formulario por su ID
    const formulario = document.getElementById("form-acceso");

    formulario.addEventListener("submit", function(evento) {
        
        // Detenemos el envío automático para que no se recargue la pantalla
        evento.preventDefault();

        // Guardamos los textos que escribió el supervisor
        let rutIngresado = document.getElementById("rut-trabajador").value;
        let zonaSeleccionada = document.getElementById("zona-destino").value;


        // VALIDACIONES

        // Revisar si dejó el campo vacio
        if (rutIngresado === "") {
            alert("Error: Por favor escriba el RUT.");
            return; 
        }

        // Revisar si el RUT esta INCOMPLETO 
        if (rutIngresado.length < 9) {
            alert("Error: El RUT está incompleto");
            return;
        }

        // Bloquear el RUT si escriben 9 numeros sin guion
        if (rutIngresado.length === 9) {
            alert("Error: Ingrese el RUT con guion (ejemplo: 12345678-9)");
            return;
        }

        // Bloquear el RUT de prueba
        if (rutIngresado === "12345678-9") {
            alert("Acceso Denegado: RUT de prueba invalido.");
            return; 
        }
        
        // Armamos el paquete de datos
        let datosParaEnviar = {
            rut: rutIngresado,
            zona: zonaSeleccionada
        };

        console.log("Enviando datos reales al servidor Node.js");

        // Usamos fetch para conectarnos a la ruta del servidor
        fetch('/api/registro', {
            method: 'POST', // Enviamos los datos de forma segura
            headers: {
                'Content-Type': 'application/json' // Le avisamos al backend que va un JSON
            },
            body: JSON.stringify(datosParaEnviar) // Convertimos el objeto a texto plano JSON
        })
        .then(function(respuesta) {
            return respuesta.json(); // Esperamos la respuesta en formato JSON del servidor
        })
        .then(function(datosServidor) {
            console.log("Respuesta del servidor recibida:", datosServidor);
            
            // Si el servidor proceso todo con exito, ejecutamos
            if (datosServidor.resultado === "OK") {
                
                // Creamos la cookie de sesion requerida
                document.cookie = "token_mineshift=sesion_activa_2026;";
                
                // Mensaje de exito del servidor y la zona
                alert("ÉXITO INTEGRACIÓN" + datosServidor.mensaje + "\nZona autorizada: " + zonaSeleccionada);
                
                // Limpiamos los campos del formulario
                formulario.reset();
            }
        })
        .catch(function(error) {
            console.error("Error de conexión:", error);
            alert("Error: No se pudo conectar con el servidor?");
        });
    });
});