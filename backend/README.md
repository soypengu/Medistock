# MediStock - Sistema de Gestión de Medicamentos

Sistema de gestión de inventario de medicamentos con Spring Boot, PostgreSQL y frontend HTML simple.

## Tecnologías
- Backend: Spring Boot 3.x, Java 17, Spring Data JPA
- Frontend: HTML, CSS, JavaScript
- Base de Datos: PostgreSQL
- Build: Maven

## Requisitos
- Java 17 o superior
- Maven 3.x
- PostgreSQL 12 o superior

## Configuración Local

### 1. Base de Datos
Crear la base de datos en PostgreSQL:
```sql
CREATE DATABASE medistock;
```

### 2. Configurar Conexión
Editar el archivo `src/main/resources/application.properties` con tus credenciales de PostgreSQL:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/medistock
spring.datasource.username=tu_usuario
spring.datasource.password=tu_contraseña
```

### 3. Ejecutar la Aplicación
```bash
mvn spring-boot:run
```

La aplicación estará disponible en `http://localhost:8080`

## Despliegue en VPS

### 1. Compilar el JAR
```bash
mvn clean package -DskipTests
```
El JAR se generará en `target/medistock-1.0.0.jar`

### 2. Preparar el VPS
- Instalar Java 17
- Instalar PostgreSQL
- Crear la base de datos `medistock`

### 3. Subir el JAR al VPS
Usar SCP o FTP para transferir el archivo JAR al servidor.

### 4. Ejecutar la Aplicación en el VPS
Crear un archivo `application-prod.properties` en el mismo directorio que el JAR con la configuración de producción:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/medistock
spring.datasource.username=usuario_prod
spring.datasource.password=contraseña_prod
server.port=8080
```

Ejecutar:
```bash
java -jar medistock-1.0.0.jar --spring.profiles.active=prod
```

### 5. Usar Systemd para Ejecutar como Servicio (Opcional)
Crear `/etc/systemd/system/medistock.service`:
```ini
[Unit]
Description=MediStock Application
After=network.target

[Service]
Type=simple
User=usuario
WorkingDirectory=/ruta/a/medistock
ExecStart=/usr/bin/java -jar medistock-1.0.0.jar --spring.profiles.active=prod
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

Habilitar y iniciar el servicio:
```bash
sudo systemctl enable medistock
sudo systemctl start medistock
```

### 6. Configurar Nginx como Proxy Inverso (Opcional)
Crear `/etc/nginx/sites-available/medistock`:
```nginx
server {
    listen 80;
    server_name tu_dominio.com;

    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

Habilitar el sitio:
```bash
sudo ln -s /etc/nginx/sites-available/medistock /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## Funcionalidades
- CRUD de Medicamentos
- CRUD de Categorías
- CRUD de Proveedores
- CRUD de Usuarios
- Entradas de Inventario (aumenta stock)
- Salidas de Inventario (disminuye stock, con validación)
