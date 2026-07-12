CREATE DATABASE IF NOT EXISTS mineshift_db;
USE mineshift_db;

CREATE TABLE IF NOT EXISTS operarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    rut VARCHAR(20) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    cargo VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS registros_acceso (
    id INT AUTO_INCREMENT PRIMARY KEY,
    rut_operario VARCHAR(20) NOT NULL,
    zona_destino VARCHAR(100) NOT NULL,
    fecha_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO operarios (rut, nombre, cargo) VALUES 
('12.345.678-9', 'Juan Perez', 'Operador de Excavadora'),
('18.765.432-1', 'Pedro Soto', 'Supervisor de Turno'),
('15.444.333-2', 'Maria Fuentes', 'Prevencionista de Riesgos');