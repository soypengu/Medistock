#!/bin/bash

# Actualizar sistema
apt update && apt upgrade -y

# Instalar Java 17
apt install -y openjdk-17-jdk

# Instalar PostgreSQL
apt install -y postgresql postgresql-contrib

# Instalar Nginx
apt install -y nginx

# Instalar Maven
apt install -y maven

# Instalar Git
apt install -y git

# Configurar PostgreSQL
sudo -u postgres psql << EOF
CREATE DATABASE medistock;
CREATE USER medistock WITH PASSWORD 'Axelob12';
GRANT ALL PRIVILEGES ON DATABASE medistock TO medistock;
\c medistock
GRANT ALL ON SCHEMA public TO medistock;
EOF

# Clonar repos separados
cd /var/www

# Backend
git clone https://github.com/soypengu/Medistock.git
cd Medistock

# Compilar backend
mvn clean package -DskipTests

# Crear directorio para el servicio
mkdir -p /opt/medistock
cp target/medistock-1.0.0.jar /opt/medistock/medistock.jar

# Frontend
cd /var/www
git clone https://github.com/soypengu/Medistock-Front.git frontend
mv frontend Medistock/
cat > /etc/systemd/system/medistock.service << EOF
[Unit]
Description=MediStock Backend Service
After=network.target postgresql.service

[Service]
Type=simple
User=root
WorkingDirectory=/opt/medistock
ExecStart=/usr/bin/java -jar /opt/medistock/medistock.jar
Restart=on-failure

[Install]
WantedBy=multi-user.target
EOF

# Configurar Nginx para frontend y backend
cat > /etc/nginx/sites-available/medistock << 'EOF'
server {
    listen 80;
    server_name 194.163.180.138;

    # Frontend
    location / {
        root /var/www/Medistock/frontend;
        index index.html;
        try_files $uri $uri/ =404;
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:8080/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF

# Habilitar sitio nginx
ln -sf /etc/nginx/sites-available/medistock /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Iniciar servicios
systemctl daemon-reload
systemctl enable medistock
systemctl start medistock
systemctl restart nginx

echo "Deploy completo!"
