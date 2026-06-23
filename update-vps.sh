#!/bin/bash

echo "=== Actualizando MediStock ==="

# 1. Navegar al directorio y traer cambios
cd /var/www/Medistock
git pull origin main

# 2. Recompilar backend
echo "=== Compilando backend ==="
cd /var/www/Medistock/backend
mvn clean package -DskipTests

# 3. Actualizar el JAR y reiniciar servicio
echo "=== Actualizando servicio backend ==="
cp target/medistock-1.0.0.jar /opt/medistock/medistock.jar
systemctl restart medistock

# 4. Verificar que el backend está corriendo
echo "=== Verificando estado del backend ==="
systemctl status medistock --no-pager | head -20

echo "=== Actualización completada! ==="
