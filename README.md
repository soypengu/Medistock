# MediStock

Sistema de gestión de inventario de medicamentos con arquitectura desacoplada.

---

## Tecnologías

- **Backend**: Spring Boot 3.2.5, Java 17, Spring Data JPA
- **Frontend**: HTML5, CSS3, JavaScript Vanilla
- **Base de Datos**: PostgreSQL
- **Servidor Web**: Nginx (para producción en VPS)

---

## Instrucciones para ejecutar LOCALMENTE

### 1. Prerrequisitos

- [Java 17+](https://adoptium.net/)
- [Maven 3.8+](https://maven.apache.org/download.cgi)
- [PostgreSQL 15+](https://www.postgresql.org/download/)
- Git

---

### 2. Configurar la Base de Datos

Abre la terminal de PostgreSQL (psql) y ejecuta:

```sql
CREATE DATABASE medistock;
CREATE USER medistock WITH PASSWORD 'Axelob12';
GRANT ALL PRIVILEGES ON DATABASE medistock TO medistock;
\c medistock
GRANT ALL ON SCHEMA public TO medistock;
```

---

### 3. Ejecutar el Backend

1. Clona el repo:
   ```bash
   git clone https://github.com/soypengu/Medistock.git
   cd Medistock
   ```

2. Compila y ejecuta:
   ```bash
   mvn clean install -DskipTests
   mvn spring-boot:run
   ```

El backend se ejecutará en `http://localhost:8080`

---

### 4. Ejecutar el Frontend

1. Clona el repo del frontend:
   ```bash
   git clone https://github.com/soypengu/Medistock-Front.git
   cd Medistock-Front
   ```

2. Abre el archivo `index.html` en tu navegador, o usa un servidor simple como **Live Server** en VS Code.

Si usas Live Server, el frontend se ejecutará en `http://localhost:5500`

---

## Repos Separados

- **Backend**: https://github.com/soypengu/Medistock.git
- **Frontend**: https://github.com/soypengu/Medistock-Front.git

---

## Deploy en VPS (Ubuntu 24.04)

Ejecuta el script `setup-vps.sh` en tu VPS:

```bash
chmod +x setup-vps.sh
./setup-vps.sh
```
