// 1. Carga los registros desde tu segunda tabla de MySQL
const cargarHistorialBD = async () => {
    try {
        const respuesta = await fetch('/api/historial');
        const datos = await respuesta.json();
        const cuerpoTabla = document.getElementById('tabla-historial-cuerpo');
        
        cuerpoTabla.innerHTML = ''; 

        if (datos.length === 0) {
            cuerpoTabla.innerHTML = `<tr><td colspan="3" class="text-center text-warning">No hay registros guardados en MySQL.</td></tr>`;
            return;
        }

        // Rellena la tabla con los datos dinámicos
        datos.forEach(reg => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${reg.rut_operario}</td>
                <td>${reg.zona_destino}</td>
                <td>${new Date(reg.fecha_hora).toLocaleString()}</td>
            `;
            cuerpoTabla.appendChild(fila);
        });
    } catch (error) {
        console.error("Error al conectar con la API de historial:", error);
    }
};

// 2. 📡 Escucha en tiempo real (Exigencia del Examen)
const socketMine = new WebSocket(`ws://${window.location.host}`);

// Evento obligatorio: onopen
socketMine.onopen = () => {
    console.log("onopen: Conexión WebSocket del panel de reportes activada.");
};

// Evento obligatorio: onmessage (Recibe el aviso cuando alguien marca en la pagina_2)
socketMine.onmessage = (evento) => {
    const datosRecibidos = JSON.parse(evento.data);
    const bannerAlerta = document.getElementById('alerta-websocket');

    // Muestra la notificación en pantalla
    bannerAlerta.innerHTML = `⚠️ <strong>Ingreso en Tiempo Real:</strong> El operario <strong>${datosRecibidos.nombre}</strong> se ha dirigido a la zona de <strong>${datosRecibidos.zona}</strong>.`;
    bannerAlerta.classList.remove('d-none');

    // Actualiza la tabla automáticamente sin recargar la página entera
    cargarHistorialBD();

    // Esconde el aviso después de 6 Segundos
    setTimeout(() => {
        bannerAlerta.classList.add('d-none');
    }, 6000);
};

// Al abrir la página carga los datos de inmediato
document.addEventListener('DOMContentLoaded', cargarHistorialBD);